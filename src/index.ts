import "dotenv/config";

import path from "path";
import express, { Request, Response, Express } from "express";
import Cookie from "cookie-parser";
import { log } from "./utils";

log.wall(30);

import "./database/db";

const app: Express = express();

const VIEWS_PATH: string = path.join(__dirname, "views");
const RSCR_PATH: string = path.join(__dirname, "public");
const PORT: string | number = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", VIEWS_PATH);
app.set("json spaces", 2);

app.use(Cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/r", express.static(RSCR_PATH));

app.listen(PORT, _ => log.info("Server", "Running on port " + PORT));