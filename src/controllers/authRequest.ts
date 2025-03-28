import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { log } from "../utils";
import db, { Model } from "../database/db";

const INTERNAL_TOKEN_SECRET: string | undefined = process.env.INTERNAL_TOKEN_SECRET;

if (!INTERNAL_TOKEN_SECRET) {
    log.warn("authRequest", "INTERNAL_TOKEN_SECRET is not set in environment variables!");
    process.exit(1);
}

export interface AuthRequest {
    sendToken: (req: Request, res: Response, next: NextFunction) => void;
    verifyToken: (req: Request, res: Response, next: NextFunction) => void;
    protectURLStatic: (req: Request, res: Response, next: NextFunction) => void;
    refreshToken: (req: Request, res: Response) => void;
}

export default function (database: Record<string, Model<typeof db.define>>): AuthRequest {
    const { User, Cacher } = database;
    const generateToken: () => string = (): string => jwt.sign({ anon: true }, INTERNAL_TOKEN_SECRET!, { expiresIn: "5m" });

    return {
        refreshToken: (req: Request, res: Response): void => {
            const token = req.headers?.authorization?.split(" ")[1] as string;

            if (!token) {
                res.status(400);
                res.json({
                    message: "Unauthorized"
                });
                return;
            }

            try {
                const decoded = jwt.verify(token, INTERNAL_TOKEN_SECRET!) as JwtPayload;

                if (!decoded || decoded.anon !== true) {
                    res.status(403);
                    res.json({ 
                        message: "Invalid token!" 
                    });
                    return;
                }

                const newToken: string = generateToken();
                res.status(200);
                res.json({
                    token: newToken
                });
            } catch {
                res.status(500);
                res.json({
                    message: "Server error, please try again later"
                });
            }
        },
        sendToken: (req: Request, res: Response, next: NextFunction): void => {
            (req as any).token = generateToken();
            next();
        },
        verifyToken: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const token = req.headers?.authorization?.split(" ")[1] as string;

            if (!token) {
                res.status(403);
                res.render("forbidden");
                return;
            }

            try {
                const decoded = jwt.verify(token, INTERNAL_TOKEN_SECRET!) as JwtPayload;

                if (decoded.anon === true) {
                    next();
                    return;
                }

                const user: Record<string, any> | undefined = await User.findOne((item: Record<string, any>): boolean => item.accessToken === token);

                if (!user) {
                    res.status(403);
                    res.render("forbidden");
                    return;
                }

                (req as any).userID = user.userID;
                next();
            } catch (error: any) {
                res.status(403);
                res.render("forbidden");
            }
        },
        protectURLStatic: (req: Request, res: Response, next: NextFunction): void => {
            const origin = req.get("Origin") as string;
            const referer = req.get("Referer") as string;

            if (!origin && !referer) {
                res.status(403);
                res.render("forbidden");
            } else
                next();
        }
    }
}