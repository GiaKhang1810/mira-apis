import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

export function applyUniqueID(req: Request, res: Response, next: NextFunction): void {
    let userID: string | undefined = req.cookies?.userID;

    if (!userID) {
        userID = 'guest-' + randomUUID();
        res.cookie('userID', userID, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10
        });
    }

    req.userID = userID;
    next();
}