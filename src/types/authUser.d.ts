import { Request, Response, NextFunction } from "express";

export interface AuthUser {
    signin: (req: Request, res: Response) => Promise<void>;
    signup: (req: Request, res: Response) => Promise<void>;
    signout: (req: Request, res: Response) => Promise<void>;
    verify: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    isSignin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    verifyMail: (req: Request, res: Response) => Promise<void>;
}