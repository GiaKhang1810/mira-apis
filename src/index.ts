import dotenv from "dotenv";

dotenv.config();

import path from "path";
import fs from "fs";
import express, { Request, Response, Express, Router } from "express";
import Cookie from "cookie-parser";
import Cors from "cors";
import axios from "axios";

import authRequest, { AuthRequest } from "./controllers/authRequest";

import RouterUser from "./routers/user";
import RouterYoutube from "./routers/youtube";
import RouterFacebook from "./routers/facebook";

import utils, { Log } from "./utils";

import db, { Model } from "./database/db";
import User from "./models/User";
import Cacher from "./models/Cacher";

!(async (): Promise<void> => {
    await User.sync();
    await Cacher.sync();

    const log: Log = utils.log;
    const database: Record<string, Model<typeof db.define>> = {
        User,
        Cacher
    }

    log.wall(30);
    log.info("DataBase", "Connected to " + db.type + " database");

    const app: Express = express();

    const requests: AuthRequest = authRequest(database);

    const routerUser: Router = RouterUser(database);
    const routerYoutbe: Router = RouterYoutube(database);
    const routerFacebook: Router = RouterFacebook(database);

    const VIEWS_PATH: string = path.join(process.cwd(), "views");
    const RSCR_PATH: string = path.join(process.cwd(), "public");
    const PORT: string | number = process.env.PORT || 8000;

    async function RefreshDTSG(): Promise<void> {
        try {
            const res = await axios.get<string>("https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=403987283654016&nav_source=no_referrer", {
                headers: {
                    "Cookie": process.env?.COOKIE_USER,
                    "Priority": "u=0, i",
                    "Origin": "https://www.facebook.com",
                    "Sec-Ch-Ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
                    "Sec-Ch-Ua-Full-Version-List": "\"Chromium\";v=\"134.0.6998.119\", \"Not:A-Brand\";v=\"24.0.0.0\", \"Google Chrome\";v=\"134.0.6998.119\"",
                    "Sec-Ch-Ua-Mobile": "?0",
                    "Sec-Ch-Ua-Model": "\"\"",
                    "Sec-Ch-Ua-Platform": "\"Windows\"",
                    "Sec-Ch-Ua-Platform-Version": "\"19.0.0\"",
                    "Sec-Fetch-Dest": "document",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-Site": "none",
                    "Sec-Fetch-User": "?1",
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36"
                }
            });

            const match: RegExpMatchArray | null = res.data.match(/"DTSGInitData",\[],\{"token":"([^"]+)",/);
            if (!match)
                throw new Error("fb_dtsg not found!");

            const fb_dtsg: string = match[1];
            process.env.FB_DTSG = fb_dtsg;
            const envPath: string = path.resolve(process.cwd(), ".env");
            const env: string[] = fs.readFileSync(envPath, "utf-8").split("\n");
            const updatedEnv: string[] = env.map((line: string): string => (line.startsWith("FB_DTSG") ? ("FB_DTSG=" + fb_dtsg) : line));
            fs.writeFileSync(envPath, updatedEnv.join("\n"), "utf-8");
        } catch (error: any) {
            log.error("RefreshDTSG", error);
            process.exit(1);
        }
    }

    if (process.env.COOKIE_USER) {
        setInterval(RefreshDTSG, 24 * 60 * 60 * 1000);
        await RefreshDTSG();
    }

    app.set("view engine", "ejs");
    app.set("views", VIEWS_PATH);
    app.set("json spaces", 2);

    app.use(Cookie());
    app.use(Cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use("/r", requests.protectURLStatic, express.static(RSCR_PATH));

    app.use("/:section/api", requests.verifyToken);
    app.use(requests.sendToken);

    app.get("/refresh", requests.verifyToken, requests.refreshToken);

    app.use("/user", routerUser);
    app.use("/youtube", routerYoutbe);
    app.use("/facebook", routerFacebook);

    app.get("/", function (req: Request, res: Response): void {
        const token = req.cookies?.sitoken;

        if (token) {
            res.redirect(302, "/user/dashboard");
        } else {
            res.redirect(302, "/user/signin");
        }
    });

    app.use("*", function (req: Request, res: Response): void {
        res.status(404);
        res.render("end");
    });

    app.listen(PORT, (): void => (log.info("Server", "Running on port " + PORT), log.wall(30)));
})();