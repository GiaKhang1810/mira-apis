import express, { Router, Request, Response } from "express";
import db, { Model } from "../database/db";
import authUser, { AuthUser } from "../controllers/authUser";
import authRequest, { AuthRequest } from "../controllers/authRequest";

export default function (database: Record<string, Model<typeof db.define>>): Router {
    const routers: Router = express.Router();
    const auth: AuthUser = authUser(database);
    const requests: AuthRequest = authRequest(database);

    routers.post("/signin", requests.verifyToken, auth.signin);
    routers.post("/signup", requests.verifyToken, auth.signup);
    routers.post("/signout", requests.verifyToken, auth.signout);
    routers.post("/verify-mail", requests.verifyToken, auth.verifyMail);
    routers.post("/verify", auth.verify, function (req: Request, res: Response): void {
        res.status(200);
        res.json({ 
            message: "User is authenticated"
        });
    });

    routers.get("/signin", auth.isSignin, function (req: Request, res: Response): void {
        res.status(200);
        res.render("user/signin");
    });

    routers.get("/signup", auth.isSignin, function (req: Request, res: Response): void {
        res.status(200);
        res.render("user/signup");
    });

    return routers;
}