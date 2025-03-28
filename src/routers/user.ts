import express, { Router, Request, Response } from "express";
import db, { Model } from "../database/db";
import authUser, { AuthUser } from "../controllers/authUser";

export default function (database: Record<string, Model<typeof db.define>>): Router {
    const routers: Router = express.Router();
    const auth: AuthUser = authUser(database);

    routers.post("/api/signin", auth.signin);
    routers.post("/api/signup", auth.signup);
    routers.post("/api/signout", auth.signout);
    routers.post("/api/verify-mail", auth.verifyMail);
    routers.post("/api/verify", auth.verify, function (req: Request, res: Response): void {
        res.status(200);
        res.json({ 
            message: "User is authenticated"
        });
    });

    routers.get("/signin", auth.isSignin, function (req: Request, res: Response): void {
        const token = req.cookies?.sitoken; 

        if (token)
            res.redirect(302, "/user/dashboard"); 

        res.status(200);
        res.render("user/signin");
    });

    routers.get("/signup", auth.isSignin, function (req: Request, res: Response): void {
        const token = req.cookies?.sitoken; 

        if (token)
            res.redirect(302, "/user/dashboard"); 

        res.status(200);
        res.render("user/signup");
    });

    return routers;
}