import chalk from 'chalk';
import time from './time';
import { resolve } from 'path';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

const ERROR_LOG: string = resolve(__dirname, '..', 'database', 'error');

if (!existsSync(ERROR_LOG))
    mkdirSync(ERROR_LOG, { recursive: true });

let interval: NodeJS.Timeout | null = null;
let frameIndex: number = 0;
const frames: Array<string> = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

function clearLine(): void {
    if (process.stdout.isTTY && typeof process.stdout.clearLine === 'function' && typeof process.stdout.cursorTo === 'function') {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
    } else
        process.stdout.write('\n');
}

export namespace Cout {
    export type Load = (text: string, cycle?: number) => void;
    export type Success = (text: string) => void;
    export type Fail=  (text: string) => void;
    export type Wall = (char?: string, lent?: number) => void;
    export type Info = (name: string, text: string, date?: number) => void;
    export type Errors = (name: string, error: Error, date?: number) => void;
    export interface Model {
        load: Load;
        success: Success;
        fail: Fail;
        wall: Wall;
        info: Info;
        warn: Info;
        error: Errors;
    }
}

const load: Cout.Load = (text: string, cycle: number = 80): void => {
    if (interval)
        clearInterval(interval);

    frameIndex = 0;

    interval = setInterval((): void => {
        const frame: string = frames[frameIndex = (frameIndex + 1) % frames.length];
        process.stdout.write('\r' + chalk.gray(time('[ HH:mm:ss DD/MM/YYYY ] ')) + chalk.blue(frame + ' ' + text));
    }, cycle);
}

const success: Cout.Success = (text: string): void => {
    if (interval) {
        clearInterval(interval);
        interval = null;
    }

    clearLine();
    process.stdout.write('\r' + chalk.gray(time('[ HH:mm:ss DD/MM/YYYY ] ')) + chalk.green('✔ ' + text) + '\n');
}

const fail: Cout.Fail = (text: string): void => {
    if (interval) {
        clearInterval(interval);
        interval = null;
    }

    clearLine();
    process.stdout.write('\r' + chalk.gray(time('[ HH:mm:ss DD/MM/YYYY ] ')) + chalk.red('✖ ' + text) + '\n');
}

const wall: Cout.Wall = (char: string = '=', lent: number = 15): void => console.log(chalk.cyan(char.repeat(lent)));

const info: Cout.Info = (name: string, text: string, date = Date.now()): void => console.log(chalk.gray(time('[ HH:mm:ss DD/MM/YYYY ]', undefined, undefined, date)), chalk.green(name), text);
const warn: Cout.Info = (name: string, text: string, date = Date.now()): void => console.log(chalk.gray(time('[ HH:mm:ss DD/MM/YYYY ]', undefined, undefined, date)), chalk.yellow(name), text);
const error: Cout.Errors = (name: string, error: Error, date = Date.now()): void => {
    console.log(chalk.gray(time('[ HH:mm:ss DD/MM/YYYY ]', undefined, undefined, date)), chalk.red(name), error.message);
    const ErrorLog: string =
        'Time: ' + time('HH:mm:ss DD/MM/YYYY') +
        '\nError: ' + error.name +
        '\nMessage: ' + error.message +
        '\nStack: ' + error.stack +
        '\n' + '-'.repeat(50) + '\n';

    writeFileSync(resolve(ERROR_LOG, new Date().toISOString().replace(/:/g, '-') + '.log'), ErrorLog);
}

export const cout: Cout.Model = {
    load,
    success,
    fail,
    wall,
    info,
    warn,
    error
}
export default cout;