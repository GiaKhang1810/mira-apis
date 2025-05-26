namespace Writer {
    export interface Response {
        download_time_ms: number;
        item_size: number;
        extension: string;
        filename: string;
        save_location: string;
    }
}