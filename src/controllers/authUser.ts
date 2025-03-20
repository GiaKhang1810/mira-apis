import { Request, Response, NextFunction } from "express";
import db, { Model } from "../database/db";
import { log, generateID, isEmail } from "../utils";
import jwt, { SignOptions } from "jsonwebtoken";
import crypt from "bcryptjs";

const SECRET = process.env.TOKEN_SECRET ?? "nguyengiakhang1810";
const EXPIRES_IN = process.env.EXPIRES_IN ?? "1d";

export interface AuthUser {
    signin: (req: Request, res: Response) => Promise<void>;
    signup: (req: Request, res: Response) => Promise<void>;
    signout: (req: Request, res: Response) => Promise<void>;
    verify: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    isSignin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

export default function (User: Model<typeof db.define>): AuthUser {
    return {
        signup: async (req: Request, res: Response): Promise<void> => {
            const { email, password, username } = req.body;

            try {
                if (!email || !password) {
                    res.status(409);
                    res.json({
                        message: "Email or password is required"
                    });
                } else if (!isEmail(email)) {
                    res.status(409);
                    res.json({
                        message: "Invalid email"
                    });
                } else {
                    const existingUser = await User.findOne({ email });
                    if (existingUser) {
                        res.status(409);
                        res.json({
                            message: "Email is already registered"
                        });
                    } else {
                        let userID: string;
                        const allUser: Array<Record<string, any>> = await User.findAll();

                        do {
                            userID = generateID();
                        } while (allUser.some((item: Record<string, any>): boolean => item.userID === userID));

                        const newUser: Record<string, any> = await User.create({
                            userID,
                            username,
                            email,
                            password: await crypt.hash(password, 10)
                        });

                        res.status(201);
                        res.json({
                            message: "Account created successfully",
                            user: newUser
                        });
                    }
                }
            } catch (error: any) {
                log.error("AuthUser.signup", error);
                res.status(500)
                res.json({
                    message: "Server error, please try again later"
                });
            }
        },
        signin: async (req: Request, res: Response): Promise<void> => {
            const { email, password, remember } = req.body;

            try {
                const user: Record<string, any> | undefined = await User.findOne({ email });
                if (!user) {
                    res.status(401);
                    res.json({
                        message: "Invalid email or password"
                    });
                } else {
                    const isCorrect: boolean = crypt.compareSync(password, user.password);
                    if (!isCorrect) {
                        res.status(401);
                        res.json({
                            message: "Invalid email or password"
                        });
                    } else {
                        const token: string = jwt.sign({ email }, SECRET, { expiresIn: remember ? "30d" : EXPIRES_IN } as SignOptions);
                        res.cookie("token", token, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === "production",
                            maxAge: 24 * 60 * 60 * 1000
                        });

                        res.status(200);
                        res.json({
                            message: "Signed in successfully",
                            token
                        });
                    }
                }
            } catch (error: any) {
                log.error("AuthUser.signin", error);
                res.status(500);
                res.json({
                    message: "Server error, please try again later"
                });
            }
        },
        signout: async (req: Request, res: Response): Promise<void> => {
            res.clearCookie("token");
            res.status(200);
            res.json({
                message: "Signed out successfully"
            });
        },
        verify: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const token = req.cookies?.token;

            if (!token) {
                res.status(401);
                res.json({
                    message: "Unauthorized, please login"
                });
            } else {
                try {
                    const decoded = jwt.verify(token, SECRET);
                    (req as any).user = decoded;
                    next();
                } catch (error: any) {
                    res.status(403);
                    res.json({
                        message: "Invalid or expired token"
                    });
                }
            }
        },
        isSignin: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const token: string | undefined = req.cookies?.token;

            if (!token) 
                next();
            else {
                try {
                    jwt.verify(token, SECRET);
                    res.status(201);
                    res.redirect("/user/dashboard");
                } catch (error: any) {
                    next();
                }
            }
        }
    }
}
