import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

interface DataCreate extends Optional<DataBase.Tokens, 'id' | 'createAt' | 'updatedAt'> {}

class Tokens extends Model<DataBase.Tokens, DataCreate> implements DataBase.Tokens {
    public userID!: string;
    public token!: string;
    public rateLimit!: number;
    public requestCount!: number;

    public readonly id?: number;
    public readonly createAt?: Date;
    public readonly updatedAt?: Date;
}

export default async function (database: Sequelize): Promise<DataBase.Model> {
    Tokens.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        rateLimit: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: false,
            defaultValue: 1000
        },
        requestCount: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: false,
            defaultValue: 0
        }
    }, {
        tableName: 'Tokens',
        sequelize: database,
        timestamps: true
    });

    await Tokens.sync();

    return {
        async findAll(): Promise<Array<DataBase.Tokens>> {
            const results: Array<DataBase.Tokens> = await Tokens.findAll();
            return results;
        },
        async findOne(condition: Record<string, any>): Promise<DataBase.Tokens | void> {
            const tokenRecord: DataBase.Tokens | null = await Tokens.findOne({ where: condition });

            if (tokenRecord)
                return tokenRecord;
        },
        async create(data: DataBase.Tokens): Promise<DataBase.Tokens> {
            const tokenRecord: DataBase.Tokens = await Tokens.create(data);

            return tokenRecord;
        },
        async delete(): Promise<void> {
            await Tokens.destroy();
        },
        async deleteOne(condition: Record<string, any>): Promise<void> {
            await Tokens.destroy({ where: condition });
        },
        async updateOne(data: Record<string, any>, condition: Record<string, any>): Promise<boolean> {
            const [updatedCount]: Array<number> = await Tokens.update(data, {
                where: condition
            });

            return updatedCount > 0;
        },
        async count(): Promise<number> {
            return await Tokens.count();
        }
    }
}