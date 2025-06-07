import { Express } from 'express';
import { applyUniqueID } from './main';

export default async function userController(app: Express): Promise<void> {
    app.use(applyUniqueID);
}