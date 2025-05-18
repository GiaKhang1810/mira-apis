import { resolve } from 'path';
import { Sequelize } from 'sequelize';

export const sequelize: Sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: resolve(__dirname, (process.env.STORAGE ?? 'database') + '.sqlite'),
    pool: {
        max: 20,
        min: 0,
        acquire: 60000,
        idle: 20000
    },
    retry: {
        match: [/SQLITE_BUSY/],
        name: 'query',
        max: 20
    },
    logging: false,
    define: {
        underscored: false,
        freezeTableName: true,
        charset: 'UTF-8',
        timestamps: true
    },
    sync: {
        force: false,
        alter: true
    }
});

export default sequelize;