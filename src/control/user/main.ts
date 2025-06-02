import { Request, Response, NextFunction } from 'express';

export function applyUniqueID(req: Request, res: Response, next: NextFunction): void {
    const userID: string | undefined = req.cookies.userID;

    if (userID) 
        return next();

    
}