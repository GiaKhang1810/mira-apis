export interface ItemSchema {
    type: string;
    required: boolean;
    unique: boolean;
    defaultValue?: any;
}

export interface Schema {
    [item: string]: ItemSchema | string;
}

export interface Model<T> {
    model: string;
    findAll: () => Promise<Array<T>>;
    findOne: (condition: Record<string, any>) => Promise<T | undefined>;
    delete: () => Promise<void>;
    deleteOne: (condition: Record<string, any>) => Promise<void>;
    update: (data: Record<string, any>) => Promise<Array<T>>;
    updateOne: (condition: Record<string, any>, data: Record<string, any>) => Promise<T>;
    create: (data: Record<string, any>) => Promise<T>;
    count: () => Promise<number>;
    sync: () => Promise<void>;
    type: () => string;
}

export interface Models {
    [model: string]: Array<any>;
}