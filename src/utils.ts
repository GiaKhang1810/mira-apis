import fs from "fs";
import path from "path";
import chalk from "chalk";

const ERROR_LOG: string = path.resolve(process.cwd(), "database", process.env.ERROR_LOG || "error.log");

export function getTime(format: string = "HH:mm:ss DD/MM/YYYY", cDate: Date = new Date()): string {
    const HH: string = String(cDate.getHours()).padStart(2, "0");
    const mm: string = String(cDate.getMinutes()).padStart(2, "0");
    const ss: string = String(cDate.getSeconds()).padStart(2, "0");
    const ms: string = String(cDate.getMilliseconds()).padStart(3, "0");
    const DD: string = String(cDate.getDate()).padStart(2, "0");
    const MM: string = String(cDate.getMonth() + 1).padStart(2, "0");
    const YYYY: string = cDate.getFullYear().toString();

    return format
        .replace(/\HH|MM|ss|mm|DD|YYYY|ms/g, (key: string): string => {
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

export const log = {
    info: (name: string, message: string): void => {
        const time: string = getTime("[ HH:mm:ss | DD/MM/YYYY ]");
        console.log(chalk.green(time), name + ":", message);
    },
    warn: (name: string, message: string): void => {
        const time: string = getTime("[ HH:mm:ss | DD/MM/YYYY ]");
        console.log(chalk.yellow(time), name + ":", message);
    },
    error: (name: string, error: Error): void => {
        const time: string = getTime("[ HH:mm:ss | DD/MM/YYYY ]");
        console.log(chalk.red(time), name + ":", error.message);
        const ErrorLog =
            time +
            "Error: " + error.name +
            "\nMessage: " + error.message +
            "\nStack: " + error.stack +
            "\n" + "-".repeat(50);

        const isExist = fs.existsSync(ERROR_LOG);
        if (!isExist) {
            fs.writeFileSync(ERROR_LOG, ErrorLog);
        } else {
            fs.appendFileSync(ERROR_LOG, ErrorLog);
        }
    },
    wall: (len: number = 15): void => console.log(chalk.blue("=".repeat(len)))
}

export const getType = (data: unknown): string => Object.prototype.toString.call(data).slice(8, -1);

export default {
    log,
    getTime,
    getType
}