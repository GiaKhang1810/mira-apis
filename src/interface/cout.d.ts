namespace Cout {
    export interface Load {
        (str: string, num?: number): void;
    }

    export interface Success {
        (str: string): void;
    }

    export interface Fail {
        (str: string): void;
    }

    export interface Wall {
        (char?: string, lent?: number): void;
    }

    export interface Info {
        (name: string, text: string, date?: Date | number): void;
    }

    export interface Errors {
        (name: string, error: Error, date?: Date | number): void;
    }

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