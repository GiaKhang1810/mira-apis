import "dotenv/config";

import path from "path";
import express, { Request, Response, Express, Router } from "express";
import Cookie from "cookie-parser";
import Cors from "cors";

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

    app.set("view engine", "ejs");
    app.set("views", VIEWS_PATH);
    app.set("json spaces", 2);

    app.use(Cookie());
    app.use(Cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use("/r", requests.protectURLStatic, express.static(RSCR_PATH));
    app.use(requests.sendToken);

    app.use("/user", routerUser);
    app.use("/youtube", routerYoutbe);
    app.use("/facebook", routerFacebook);

    app.get("/", function (req: Request, res: Response): void {
        res.redirect(302, "/user/signin");
    });

    app.use("*", function (req: Request, res: Response): void {
        res.status(404);
        res.render("end");
    });

    app.listen(PORT, (): void => (log.info("Server", "Running on port " + PORT), log.wall(30)));
})();