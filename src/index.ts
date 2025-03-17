import * as dotenv from "dotenv";
import * as path from "path";
import express, { Request, Response } from "express";
import Cookie from "cookie-parser";

dotenv.config();

import utils from "./utils";

const app = express();
const log = utils.log;

log.wall(30);

const VIEWS_PATH = path.join(__dirname, "views");
const RSCR_PATH = path.join(__dirname, "public");
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", VIEWS_PATH);
app.set("json spaces", 2);

app.use(Cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/r", express.static(RSCR_PATH));

app.listen(PORT, _ => log.info("Server", "Running on port " + PORT));