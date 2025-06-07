import { execSync, spawnSync, SpawnSyncReturns } from 'child_process';
import { resolve } from 'path';
import { existsSync, rmSync, Stats, statSync, readdirSync, mkdirSync, copyFileSync } from 'fs';
import { tmpdir } from 'os';

import cout from '@utils/cout';
import { Request } from '@utils/request';

import { version } from '../package.json';

const cwd: string = process.cwd();
const repo: string = 'https://github.com/GiaKhang1810/mira-apis.git';
const tempClone = resolve(tmpdir(), 'mira-apis-latest');
const backupDir: string = resolve(cwd, '.backup');

const request: Request = new Request({ type: 'json' });

type GetVersionCurrent = {
    version: string;
}

function isHigherOrEqualVersion(current: string, target: string): boolean {
    const cParts: Array<number> = current.split('.').map(Number);
    const tParts: Array<number> = target.split('.').map(Number);
    const length: number = Math.max(cParts.length, tParts.length);

    for (let i = 0; i < length; i++) {
        const cPart: number = cParts[i] ?? 0;
        const tPart: number = tParts[i] ?? 0;

        if (cPart < tPart)
            return false;
        
        if (cPart > tPart)
            return true;
    }

    return true;
}

async function getVersionCurrent(): Promise<string> {
    const response: Request.Response<GetVersionCurrent> = await request.get<GetVersionCurrent>('https://raw.githubusercontent.com/GiaKhang1810/mira-apis/refs/heads/main/package.json');
    const version: string = response.body?.version;

    if (version)
        return version;

    throw new Error('Unable to get latest version information on github.');
}

async function checkGit(): Promise<boolean> {
    const git: SpawnSyncReturns<Buffer<ArrayBufferLike>> = spawnSync('git', ['--version']);

    if (git.error ?? git.status !== 0) {
        cout.warn('System', 'Git is not installed.');
        cout.warn('System', 'Please install Git before continuing: https://git-scm.com/downloads');
        return false;
    }

    return true;
}

async function copyRecursive(src: string, dest: string): Promise<void> {
    if (!existsSync(src))
        return;

    const stat: Stats = statSync(src);

    if (stat.isDirectory()) {
        mkdirSync(dest, { recursive: true });

        for (const file of readdirSync(src))
            await copyRecursive(resolve(src, file), resolve(dest, file));
    } else {
        mkdirSync(resolve(dest, '..'), { recursive: true });
        copyFileSync(src, dest);
    }
}

async function createBackup(): Promise<void> {
    rmSync(backupDir, { recursive: true, force: true });

    const backups: Array<string> = ['src', 'static', 'views', 'package.json', '.gitignore', 'eslint.config.js', 'README.md', 'LICENSE'];

    for (let fileOrDir of backups) {
        const src: string = resolve(cwd, fileOrDir);
        const dest = resolve(backupDir, fileOrDir);

        if (existsSync(src))
            await copyRecursive(src, dest);
    }

    cout.info('System', 'Backup created at .backup/');
}

async function restoreBackup(): Promise<void> {
    const fileOrDirRestore: Array<string> = readdirSync(backupDir);

    for (const fileOrDir of fileOrDirRestore)
        await copyRecursive(resolve(backupDir, fileOrDir), resolve(cwd, fileOrDir));

    cout.info('System', 'Restore completed.');
}

async function initGit(): Promise<void> {
    if (existsSync(resolve(cwd, '.git')))
        return;

    cout.info('System', 'Initializing Git repository...');
    execSync('git init', { cwd, stdio: 'ignore' });
    execSync('git add .', { cwd, stdio: 'ignore' });
    execSync('git commit -m "Initial backup before update"', { cwd, stdio: 'ignore' });
}

async function updateAndRestart(): Promise<void> {
    try {
        await createBackup();
        await initGit();

        rmSync(tempClone, { recursive: true, force: true });
        execSync('git clone --depth=1 ' + repo + ' "' + tempClone + '"', { stdio: 'ignore' });

        const fileOrDirUpdate = ['src', 'static', 'views', 'package.json', '.gitignore', 'eslint.config.js', 'README.md', 'LICENSE'];
        for (const fileOrDir of fileOrDirUpdate) {
            const src = resolve(tempClone, fileOrDir);
            const dest = resolve(cwd, fileOrDir);
            if (existsSync(src)) {
                rmSync(dest, { recursive: true, force: true });
                await copyRecursive(src, dest);
            }
        }

        rmSync(backupDir, { recursive: true, force: true });
        rmSync(tempClone, { recursive: true, force: true });

        cout.success('Updated successfully.');
        cout.wall('=', 100);
        process.exit(0);
    } catch (error: any) {
        cout.fail('Update failed.');
        cout.error('System', error);

        cout.warn('System', 'Restoring from backup...');
        if (existsSync(backupDir))
            await restoreBackup();
        else
            cout.warn('System', 'No backup available to restore.');

        rmSync(backupDir, { recursive: true, force: true });
        rmSync(tempClone, { recursive: true, force: true });

        cout.wall('=', 100);
        process.exit(1);
    }
}

async function checkAndUpdate(): Promise<void> {
    try {
        cout.info('System', 'Running on version ' + version);

        const versionCurrent: string = await getVersionCurrent();

        if (isHigherOrEqualVersion(version, versionCurrent))
            return;

        cout.info('System', 'Version ' + versionCurrent + ' is available. Refer to ' + repo);

        if (process.env.AUTO_UPDATE === 'true') {
            if (!(await checkGit()))
                return;

            cout.warn('System', 'System update in progress. Please do not exit the program until complete!');
            cout.load('Updating system...');
            await updateAndRestart();
        }
    } catch (error: any) {
        cout.warn('System', 'Unable to check/update system.');
        cout.error('System', error);
    }
}
export default checkAndUpdate;