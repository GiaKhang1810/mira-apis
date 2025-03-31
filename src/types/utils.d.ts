export interface Log {
    info: (name: string, message: string) => void;
    warn: (name: string, message: string) => void;
    error: (name: string, error: Record<string, any>) => void;
    wall: (len: number) => void;
}

export interface GetType {
    (data: any): string;
}

export interface GenerateID {
    (len: number): string;
}

export interface IsEmail {
    (email: string): boolean;
}