import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";
import { createTransport, Transporter } from "nodemailer";
import { Options as TransportOptions } from "nodemailer/lib/smtp-transport";
import jwt, { SignOptions } from "jsonwebtoken";
import crypt from "bcryptjs";
import db, { Model } from "../database/db";
import { log, generateID, isEmail } from "../utils";

const SECRET: string = process.env.TOKEN_SECRET || "nguyengiakhang1810";
const EXPIRES_IN: string = process.env.EXPIRES_IN || "1d";

const GMAIL: string | undefined = process.env.GMAIL;
const CLIENT_ID: string | undefined = process.env.CLIENT_ID;
const CLIENT_SECRET: string | undefined = process.env.CLIENT_SECRET;
const REDIRECT_URI: string | undefined = process.env.REDIRECT_URI;
const REFRESH_TOKEN: string | undefined = process.env.REFRESH_TOKEN;

if (!GMAIL || !CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI || !REFRESH_TOKEN) {
    log.warn("Auth.verifyMail", "Lack of data in the environment");
    process.exit(1);
}

const client: OAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
client.setCredentials({ refresh_token: REFRESH_TOKEN });

export interface AuthUser {
    signin: (req: Request, res: Response) => Promise<void>;
    signup: (req: Request, res: Response) => Promise<void>;
    signout: (req: Request, res: Response) => Promise<void>;
    verify: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    isSignin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    verifyMail: (req: Request, res: Response) => Promise<void>;
}

export default function (database: Record<string, Model<typeof db.define>>): AuthUser {
    const { User, Cacher } = database;

    return {
        signup: async (req: Request, res: Response): Promise<void> => {
            const { email, password, verifyCode } = req.body;

            try {
                if (!email || !password || !verifyCode) {
                    res.status(409);
                    res.json({
                        message: "Email or password or verifyCode is required"
                    });
                } else if (!isEmail(email)) {
                    res.status(409);
                    res.json({
                        message: "Invalid email"
                    });
                } else {
                    const existingUser: Record<string, any> | undefined = await User.findOne({ email });
                    if (existingUser) {
                        res.status(409);
                        res.json({
                            message: "Email is already registered"
                        });
                    } else {
                        const userCache: Record<string, any> | undefined = await Cacher.findOne({ email });

                        if (!userCache) {
                            res.status(401);
                            res.json({
                                message: "Verification code not sent"
                            });
                        } else if (userCache.verifyCode !== verifyCode) {
                            res.status(401);
                            res.json({
                                message: "Incorrect verification code"
                            });
                        } else if (Date.now() > userCache.expiresAt) {
                            res.status(401);
                            res.json({
                                message: "Verification code has expired"
                            });
                        } else {
                            let userID: string;
                            const allUser: Array<Record<string, any>> = await User.findAll();

                            do {
                                userID = generateID();
                            } while (allUser.some((item: Record<string, any>): boolean => item.userID === userID));

                            const newUser: Record<string, any> = await User.create({
                                userID,
                                email,
                                password: await crypt.hash(password, 10)
                            });
                            await Cacher.deleteOne({ email });

                            newUser.password = undefined;

                            res.status(201);
                            res.json({
                                message: "Account created successfully",
                                user: newUser
                            });
                        }

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
                    const isCorrect: boolean = await crypt.compare(password, user.password);
                    if (!isCorrect) {
                        res.status(401);
                        res.json({
                            message: "Invalid email or password"
                        });
                    } else {
                        const token: string = jwt.sign({ email }, SECRET, { expiresIn: remember === "true" ? "30d" : EXPIRES_IN } as SignOptions);
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
        },
        verifyMail: async (req: Request, res: Response): Promise<void> => {
            const { email } = req.body;
            if (!isEmail(email)) {
                res.status(400);
                res.json({
                    message: "Email is required"
                });
            } else {
                const existingUser: Record<string, any> | undefined = await User.findOne({ email });
                if (existingUser) {
                    res.status(409);
                    res.json({
                        message: "Email is already registered"
                    });
                } else {
                    const isExist: Record<string, any> | undefined = await Cacher.findOne({ email });
                    if (isExist && isExist.expiresAt - Date.now() > 60 * 1000 * 2) {
                        res.status(400);
                        res.json({
                            message: "A verification code has already been sent. Please wait for it to expire."
                        });
                    } else {
                        try {
                            const verifyCode: string = Math.floor(100000 + Math.random() * 900000).toString();
                            const expiresAt: number = Date.now() + 10 * 60 * 1000;
                            isExist ? await Cacher.updateOne({ email }, { verifyCode, expiresAt }) : await Cacher.create({ email, verifyCode, expiresAt });

                            const transOptions: TransportOptions = {
                                service: "gmail",
                                auth: {
                                    type: "OAuth2",
                                    user: GMAIL,
                                    clientId: CLIENT_ID,
                                    clientSecret: CLIENT_SECRET,
                                    refreshToken: REFRESH_TOKEN,
                                    accessToken: (await client.getAccessToken()).token || undefined
                                }
                            }
                            const trans: Transporter = createTransport(transOptions);
                            await trans.sendMail({
                                from: `"Mira APIs" <${GMAIL}>`,
                                to: email,
                                subject: "🔒 Your Verification Code",
                                html: `
                                <!DOCTYPE html>
                                <html lang="en">
                                    <head>
                                        <meta charset="UTF-8">
                                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                        <title>Verification Code</title>
                                        <style>
                                            body {
                                                font-family: Arial, sans-serif;
                                                background-color: #f4f4f4;
                                                margin: 0;
                                                padding: 0;
                                            }
                                            .container {
                                                max-width: 500px;
                                                margin: 20px auto;
                                                background: #ffffff;
                                                padding: 20px;
                                                border-radius: 8px;
                                                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                                                text-align: center;
                                            }
                                            h2 {
                                                color: #333;
                                            }
                                            p {
                                                font-size: 16px;
                                                color: #555;
                                            }
                                            .code {
                                                font-size: 24px;
                                                font-weight: bold;
                                                background: #f8f9fa;
                                                padding: 10px;
                                                display: inline-block;
                                                border-radius: 5px;
                                                margin: 10px 0;
                                            }
                                            .footer {
                                                font-size: 14px;
                                                color: #777;
                                                margin-top: 20px;
                                            }
                                        </style>
                                    </head>
                                    <body>
                                        <div class="container">
                                            <h2>🔒 Your Verification Code</h2>
                                            <p>Thank you for signing up! Here is your verification code:</p>
                                            <div class="code">${verifyCode}</div>
                                            <p>📅 This code is valid for <strong>10 minutes</strong>.</p>
                                            <p>If you did not request this code, please ignore this email.</p>
                                            <div class="footer">
                                                Best regards,<br>
                                                <strong>Mira Support Team</strong>
                                            </div>
                                         </div>
                                    </body>
                                </html>`
                            });
                            res.status(200);
                            res.json({
                                message: "Verification code sent successfully"
                            });
                        } catch (error: any) {
                            log.error("AuthUser.verifyMail", error);
                            res.status(500);
                            res.json({
                                message: "Failed to send verification email"
                            });
                        }
                    }
                }
            }
        }
    }
}
