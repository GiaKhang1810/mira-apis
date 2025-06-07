import database, { DataBase } from './database';
import modelUser from './model/user';
import modelToken from './model/token';
import cout from '@utils/cout';

export default async function (): Promise<Record<string, DataBase.Model>> {
    try {
        await database.authenticate();
        cout.info('DataBase', 'Connected to database');

        const User: DataBase.Model = await modelUser(database);
        const Tokens: DataBase.Model = await modelToken(database);

        return {
            User,
            Tokens
        }
    } catch (error: any) {
        cout.error('DataBase', error);
        process.exit(1);
    }
}