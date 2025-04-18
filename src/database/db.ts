import fs from "fs";
import path from "path";
import {
    Model,
    Models,
    Schema,
    ItemSchema
} from "../types/database";

const dbCwd: string = path.resolve(process.cwd(), "database");

if (!fs.existsSync(dbCwd))
    fs.mkdirSync(dbCwd);

import { EventEmitter } from "events";
import { getType, log } from "../utils";
import { Sequelize, DataTypes, AbstractDataTypeConstructor, Model as ModelSeq, ModelCtor } from "sequelize";

const type: string = process.env.STORAGE_TYPE || "sqlite";

export type {
    Model,
    Models,
    Schema,
    ItemSchema
}

export class DataBase extends EventEmitter {
    private storage: string;
    private writeQueue: Array<(db: Models) => Models>;
    private isWriting: boolean;
    private models: Models;
    private schemas: Record<string, Schema>;
    private sequelize?: Sequelize;
    private SQLite?: ModelCtor<ModelSeq<any, any>>;
    public type: string;

    constructor(STORAGE: string) {
        super();

        this.type = type;
        this.writeQueue = [];
        this.isWriting = false;
        this.models = {}
        this.schemas = {}

        if (type === "json") {
            this.storage = path.resolve(dbCwd, STORAGE + ".json");

            if (!fs.existsSync(this.storage))
                fs.writeFileSync(this.storage, "{}");

        } else if (type === "sqlite") {
            this.storage = path.resolve(dbCwd, STORAGE + ".sqlite");

            this.sequelize = new Sequelize({
                dialect: type,
                storage: this.storage,
                pool: {
                    max: 20,
                    min: 0,
                    acquire: 60000,
                    idle: 20000
                },
                retry: {
                    match: [
                        /SQLITE_BUSY/,
                    ],
                    name: "query",
                    max: 20
                },
                logging: false,
                transactionType: "IMMEDIATE" as any,
                define: {
                    underscored: false,
                    freezeTableName: true,
                    charset: "utf8",
                    timestamps: true
                },
                sync: {
                    force: false
                }
            });

            this.sequelize
                .authenticate()
                .catch((error: any): void => {
                    this.emit("error", {
                        type: "AuthenticateData",
                        name: error.name,
                        message: error.message,
                        stack: error.stack
                    });
                    process.exit(1);
                });
        } else {
            log.warn("DataBase", `Unsupported STORAGE_TYPE "${type}"`);
            process.exit(1);
        }
    }

    private read(): Models {
        try {
            return JSON.parse(fs.readFileSync(this.storage, "utf8"));
        } catch (error: any) {
            this.emit("error", {
                type: "ReadData",
                name: error.name,
                message: error.message,
                stack: error.stack
            });
            return {}
        }
    }

    private write(writer: (db: Models) => Models): void {
        this.writeQueue.push(writer);
        this.processQueue();
    }

    private async processQueue(): Promise<void> {
        if (this.isWriting)
            return;

        this.isWriting = true;
        const updates = this.writeQueue;
        this.writeQueue = [];

        try {
            let db = this.read();

            for (let update of updates)
                db = update(db);

            fs.writeFileSync(this.storage, JSON.stringify(db, null, 2));
        } catch (error: any) {
            this.emit("error", {
                type: "WriteData",
                name: error.name,
                message: error.message,
                stack: error.stack
            });
        } finally {
            this.isWriting = false;
            if (this.writeQueue.length > 0)
                this.processQueue();
        }
    }

    private sync(model: string, schema: Schema): void {
        this.write((db: Models): Models => {
            if (!db[model]) {
                db[model] = [];
                this.emit("info", {
                    type: "SyncModel",
                    model,
                    message: `Model ${model} synced`,
                    schema
                });
            }
            return db;
        });
        this.schemas[model] = schema;
    }

    private validate(model: string, data: Record<string, any>): boolean {
        const schema = this.schemas[model];

        if (!schema) {
            this.emit("error", {
                type: "ValidateData",
                message: `Missing model: ${model}`
            });

            return false;
        }

        for (let key in schema) {
            const rule = schema[key] as ItemSchema;

            if (rule.defaultValue && getType(rule.defaultValue) === rule.type && data[key] === undefined)
                data[key] = rule.defaultValue;

            if (rule.required && !data[key]) {
                this.emit("error", {
                    type: "ValidateData",
                    message: `Missing required field: ${key}`
                });

                return false;
            }

            if (rule.unique && this.read()[model].some(item => item[key] === data[key])) {
                this.emit("error", {
                    type: "ValidateData",
                    message: `Duplicate data for field ${key}`
                });

                return false;
            }
        }

        return true;
    }

    public connect(): void {
        this.emit("info", {
            type: "ConnectData",
            path: this.storage,
            message: `Connected to ${path.basename(this.storage)}`
        });
    }

    public define<T>(model: string, schema: Schema): Model<T> {
        if (type === "json") {
            const newSchema: Schema = {}

            for (let key in schema) {
                const item = schema[key];
                newSchema[key] = typeof item === "string" ? { type: item, required: false, unique: false } : item;
            }

            return {
                model,
                findAll: async (): Promise<Array<T>> => this.read()[model],
                findOne: async (condition: Record<string, any>): Promise<T | undefined> => {
                    return this.read()[model]?.find((item: T) => Object.keys(condition).every(key => item[key as keyof T] === condition[key]));
                },
                delete: async (): Promise<void> => {
                    this.write((db: Models): Models => {
                        delete db[model];
                        return db;
                    });
                },
                deleteOne: async (condition: Record<string, any>): Promise<void> => {
                    this.write((db: Models): Models => {
                        db[model] = db[model]?.filter((item: T) => !Object.keys(condition).every(key => item[key as keyof T] === condition[key]));
                        return db;
                    });
                },
                update: async (data: Record<string, any>): Promise<Array<T>> => {
                    for (let key in schema) {
                        const rule = schema[key] as ItemSchema;

                        if (data[key] && rule.type !== getType(data[key])) {
                            this.emit("error", {
                                type: "ValidateData",
                                message: `Duplicate data for field ${key}`
                            });

                            throw new Error("Validate failed");
                        }

                        if (rule.unique && this.read()[model].some(item => item[key] === data[key])) {
                            this.emit("error", {
                                type: "ValidateData",
                                message: `Duplicate data for field ${key}`
                            });

                            throw new Error("Validate failed");
                        }
                    }

                    this.write((db: Models): Models => {
                        db[model] = db[model]?.map(item => ({
                            ...item,
                            ...data,
                            updateAt: new Date().toISOString()
                        }));
                        return db;
                    });
                    return this.read()[model];
                },
                updateOne: async (condition: Record<string, any>, data: Record<string, any>): Promise<T> => {
                    for (let key in schema) {
                        const rule = schema[key] as ItemSchema;

                        if (data[key] && rule.type !== getType(data[key])) {
                            this.emit("error", {
                                type: "ValidateData",
                                message: `Duplicate data for field ${key}`
                            });

                            throw new Error("Validate failed");
                        }

                        if (rule.unique && this.read()[model].some(item => item[key] === data[key])) {
                            this.emit("error", {
                                type: "ValidateData",
                                message: `Duplicate data for field ${key}`
                            });

                            throw new Error("Validate failed");
                        }
                    }

                    let updatedItem: T | undefined;
                    this.write((db: Models): Models => {
                        db[model] = db[model]?.map((item: T) => {
                            if (Object.keys(condition).every(key => item[key as keyof T] === condition[key])) {
                                updatedItem = {
                                    ...item,
                                    ...data,
                                    updateAt: new Date().toISOString()
                                }
                                return updatedItem;
                            }
                            return item;
                        });
                        return db;
                    });
                    return updatedItem!;
                },
                create: async (data: Record<string, any>): Promise<T> => {
                    if (!this.validate(model, data))
                        throw new Error("Validation failed");

                    const db = this.read();

                    let newItem: T = {
                        id: (db[model]?.length || 0) + 1,
                        ...data,
                        createAt: new Date().toISOString(),
                        updateAt: new Date().toISOString()
                    } as T;
                    this.write((db: Models): Models => {
                        db[model] = db[model] || [];
                        db[model].push(newItem);
                        return db;
                    });

                    return newItem;
                },
                count: async (): Promise<number> => this.read()[model]?.length ?? 0,
                sync: async (): Promise<void> => this.sync(model, schema),
                type: (): string => "Json"
            }
        } else {
            const newSchema: Record<string, any> = {}
            const getTypeSequelize = (type: string): AbstractDataTypeConstructor => {
                switch (type) {
                    case "String":
                        return DataTypes.STRING;
                    case "Number":
                        return DataTypes.INTEGER;
                    case "Date":
                        return DataTypes.DATE;
                    case "Array":
                        return DataTypes.ARRAY;
                    case "Object":
                        return DataTypes.JSON;
                    case "Boolean":
                        return DataTypes.BOOLEAN;
                    default:
                        throw new Error("Unsupport type " + type);
                }
            }

            for (let key in schema) {
                const item = schema[key];

                if (typeof item === "string")
                    newSchema[key] = {
                        type: getTypeSequelize(item),
                        unique: false,
                        allowNull: true
                    }
                else
                    newSchema[key] = {
                        type: getTypeSequelize(item.type),
                        unique: item.unique,
                        allowNull: !item.required,
                        defaultValue: item.defaultValue
                    }
            }

            this.SQLite = this.sequelize!.define(model, newSchema, {
                tableName: model,
                freezeTableName: true,
                timestamps: true
            });

            return {
                model,
                findAll: async (): Promise<Array<T>> => {
                    const results = await this.SQLite!.findAll();
                    return results.map(r => r.get({ plain: true })) as Array<T>;
                },
                findOne: async (condition: Record<string, any>): Promise<T | undefined> => {
                    const result = await this.SQLite!.findOne({ where: condition });
                    return result ? (result.get({ plain: true }) as T) : undefined;
                },
                delete: async (): Promise<void> => {
                    await this.SQLite!.destroy({ where: {} });
                },
                deleteOne: async (condition: Record<string, any>): Promise<void> => {
                    await this.SQLite!.destroy({ where: condition });
                },
                update: async (data: Record<string, any>): Promise<Array<T>> => {
                    await this.SQLite!.update(data, { where: {} });
                    const results = await this.SQLite!.findAll();
                    return results.map(r => r.get({ plain: true })) as Array<T>;
                },
                updateOne: async (condition: Record<string, any>, data: Record<string, any>): Promise<T> => {
                    await this.SQLite!.update(data, { where: condition });
                    const result = await this.SQLite!.findOne({ where: condition });
                    if (!result)
                        throw new Error("Update failed");
                    return result.get({ plain: true }) as T;
                },
                create: async (data: Record<string, any>): Promise<T> => {
                    const result = await this.SQLite!.create(data);
                    return result.get({ plain: true }) as T;
                },
                count: async (): Promise<number> => {
                    return await this.SQLite!.count();
                },
                sync: async (): Promise<void> => {
                    await this.SQLite!.sync({ force: false });

                    this.emit("info", {
                        type: "SyncModel",
                        model,
                        message: `Model ${model} synced`,
                        schema
                    });
                },
                type: (): string => "SQLite"
            }
        }
    }
}

export const db: DataBase = new DataBase(process.env.STORAGE || "db");
export default db;