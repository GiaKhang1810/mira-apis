import fs from "fs";
import path from "path";
import { getType, log } from "../utils";
import { EventEmitter } from "events";

interface Schema {
    [key: string]: {
        type: string,
        required: boolean,
        unique: boolean,
        defaultValue?: any,
        extend: (db: any) => any;
    }
}

interface Models {
    [key: string]: Schema;
}

class DataBase extends EventEmitter {
    private storage: string;
    private writeQueue: Array<(db: any) => any>;
    private isWriting: boolean;
    private models: Models

    constructor(STORAGE_PATH: string) {
        super();

        this.storage = path.resolve(STORAGE_PATH);
        this.writeQueue = [];
        this.isWriting = false;
        this.models = {}

        const isExist = fs.existsSync(this.storage);
        if (!isExist)
            fs.writeFileSync(this.storage, "{}");
    }

    private read(): Record<string, any> {
        try {
            return require(this.storage);
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

    public write(UPDATED_FUNC: (db: any) => any): void {
        this.writeQueue.push(UPDATED_FUNC);
        this.processQueue();
    }

    private async processQueue(): Promise<void> {
        try {
            if (this.isWriting) 
                return;

            this.isWriting = true;
            const updates = this.writeQueue;
            let db = this.read();
            this.writeQueue = [];

            for (let update of updates) 
                db = update(db);

            fs.writeFileSync(this.storage, JSON.stringify(db, null, 2));
        } catch (error) {
            this.emit("error", error);
        } finally {
            this.isWriting = false;

            if (this.writeQueue.length > 0) 
                this.processQueue();
        }
    }

    public sync(model: string, schema: Schema): void {
        this.write((db: any): void => {
            if (db[model] === undefined) {
                db[model] = [];
                this.emit("info", {
                    type: "SyncData",
                    name: model,
                    message: "Model " + model + " synced",
                    schema
                });
            }

            return db;
        });

        this.models[model] = schema;
    }
}