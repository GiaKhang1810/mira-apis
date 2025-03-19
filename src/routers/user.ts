import express, { Router, Request, Response } from "express";
import db, { Model } from "../database/db";
import authUser, { AuthUser } from "../controllers/authUser";

export default function (User: Model<typeof db.define>): Router {
    const routers: Router = express.Router();
    const auth: AuthUser = authUser(User);

    routers.post("/signin", auth.signin);
    routers.post("/signup", auth.signup);
    routers.post("/signout", auth.signout);
    routers.get("/verify", auth.verify, function (req: Request, res: Response): void {
        res.status(200);
        res.json({ 
            message: "User is authenticated" 
        });
    });

    return routers;
}