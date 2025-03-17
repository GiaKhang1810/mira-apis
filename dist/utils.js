"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getType = exports.log = void 0;
exports.getTime = getTime;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const ERROR_LOG = path_1.default.resolve(process.env.ERROR_LOG || "./database/error.log");
function getTime(format, date) {
    format = format || "HH:mm:ss DD/MM/YYYY";
    const cDate = date ? date : new Date();
    const HH = String(cDate.getHours()).padStart(2, "0");
    const mm = String(cDate.getMinutes()).padStart(2, "0");
    const ss = String(cDate.getSeconds()).padStart(2, "0");
    const ms = String(cDate.getMilliseconds()).padStart(3, "0");
    const DD = String(cDate.getDate()).padStart(2, "0");
    const MM = String(cDate.getMonth() + 1).padStart(2, "0");
    const YYYY = String(cDate.getFullYear());
    return format
        .replace(/\HH|MM|ss|mm|DD|YYYY|ms/g, (key) => {
        switch (key) {
            case "HH":
                return HH;
            case "mm":
                return mm;
            case "ss":
                return ss;
            case "ms":
                return ms;
            case "DD":
                return DD;
            case "MM":
                return MM;
            case "YYYY":
                return YYYY;
            default:
                return key;
        }
    });
}
exports.log = {
    info: (name, message) => {
        const time = getTime("[ HH:mm:ss | DD/MM/YYYY ]", null);
        console.log(chalk_1.default.green(time), name + ":", message);
    },
    warn: (name, message) => {
        const time = getTime("[ HH:mm:ss | DD/MM/YYYY ]", null);
        console.log(chalk_1.default.yellow(time), name + ":", message);
    },
    error: (name, error) => {
        const time = getTime("[ HH:mm:ss | DD/MM/YYYY ]", null);
        console.log(chalk_1.default.red(time), name + ":", error.message);
        const ErrorLog = time +
            "Error: " + error.name +
            "\nMessage: " + error.message +
            "\nStack: " + error.stack +
            "\n" + "-".repeat(50);
        const isExist = fs_1.default.existsSync(ERROR_LOG);
        if (!isExist) {
            fs_1.default.writeFileSync(ERROR_LOG, ErrorLog);
        }
        else {
            fs_1.default.appendFileSync(ERROR_LOG, ErrorLog);
        }
    },
    wall: (len) => {
        len = len ? len : 15;
        console.log(chalk_1.default.blue("=".repeat(len)));
    }
};
const getType = (data) => Object.prototype.toString.call(data).slice(8, -1);
exports.getType = getType;
exports.default = {
    log: exports.log,
    getTime,
    getType: exports.getType
};
