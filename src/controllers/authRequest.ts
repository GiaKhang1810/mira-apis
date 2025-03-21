import { Request, Response, NextFunction } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { log } from "../utils";

const INTERNAL_TOKEN_SECRET: string | undefined = process.env.INTERNAL_TOKEN_SECRET;

if (!INTERNAL_TOKEN_SECRET) {
    log.warn("authRequest", "INTERNAL_TOKEN_SECRET is not set in environment variables!");
    process.exit(1);
}

export interface AuthRequest {
    sendToken: (req: Request, res: Response, next: NextFunction) => void;
    verifyToken: (req: Request, res: Response, next: NextFunction) => void;
}

export default function (): AuthRequest {
    const generateToken: () => string = (): string => jwt.sign({ anon: true }, INTERNAL_TOKEN_SECRET!, { expiresIn: "1m" });

    return {
        sendToken: (req: Request, res: Response, next: NextFunction): void => {
            const token: string = generateToken();

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60000
            });

            next();
        },
        verifyToken: (req: Request, res: Response, next: NextFunction): void => {
            const token: string = req.cookies?.token || req.headers.authorization?.split(" ")[1];

            if (!token) {
                res.status(403);
                res.render("forbidden");
            } else {
                try {
                    jwt.verify(token, INTERNAL_TOKEN_SECRET!);
                    next();
                } catch (error: any) {
                    res.status(403);
                    res.render("forbidden");
                }
            }
        }
    }
}