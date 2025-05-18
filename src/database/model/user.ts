import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

interface DataCreate extends Optional<DataBase.User, 'id' | 'createAt' | 'updatedAt'> { }

class User extends Model<DataBase.User, DataCreate> implements DataBase.User {
    public userID!: string;
    public username!: string;
    public email!: string;
    public password!: string;
    public bannedAt!: number;
    public bannedReason!: string;

    public readonly id?: number;
    public readonly createAt?: Date;
    public readonly updatedAt?: Date;
}

export default async function (database: Sequelize): Promise<DataBase.Model> {
    User.init({
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
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            defaultValue: 'Mira User'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        bannedAt: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: false,
            defaultValue: 0
        },
        bannedReason: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            defaultValue: ''
        }
    }, {
        tableName: 'User',
        sequelize: database,
        timestamps: true
    });

    await User.sync();

    return {
        async findAll(): Promise<Array<DataBase.User>> {
            const results: Array<DataBase.User> = await User.findAll();
            return results;
        },
        async findOne(condition: Record<string, any>): Promise<DataBase.User | void> {
            const user: DataBase.User | null = await User.findOne({ where: condition });

            if (user)
                return user;
        },
        async create(data: DataBase.User): Promise<DataBase.User> {
            const user: DataBase.User = await User.create(data);

            return user;
        },
        async delete(): Promise<void> {
            await User.destroy();
        },
        async deleteOne(condition: Record<string, any>): Promise<void> {
            await User.destroy({ where: condition });
        },
        async updateOne(data: Record<string, any>, condition: Record<string, any>): Promise<boolean> {
            const [updatedCount]: Array<number> = await User.update(data, {
                where: condition
            });

            return updatedCount > 0;
        },
        async count(): Promise<number> {
            return await User.count();
        }
    }
}