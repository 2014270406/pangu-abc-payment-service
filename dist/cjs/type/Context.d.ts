export declare type LogMethod = (message: string, ...meta: any[]) => void;
export interface Logger {
    info: LogMethod;
    error: LogMethod;
}
export interface Context {
    traceId: string;
    logger: Logger;
}
export declare const logSql: (logger: Logger, queryAndParams: [string, any[]]) => void;
