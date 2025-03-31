import { Request, Response, NextFunction } from "express";

export interface AuthRequest {
    sendToken: (req: Request, res: Response, next: NextFunction) => void;
    verifyToken: (req: Request, res: Response, next: NextFunction) => void;
    protectURLStatic: (req: Request, res: Response, next: NextFunction) => void;
    refreshToken: (req: Request, res: Response) => void;
}

export interface GenerateToken {
    (): string;
}