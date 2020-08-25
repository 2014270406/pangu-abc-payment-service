
export type LogMethod = (message: string, ...meta: any[]) => void;

export interface Logger {
    info: LogMethod,
    error: LogMethod
}

export interface Context {
    traceId: string,
    logger: Logger
}

export const logSql = (logger: Logger, queryAndParams: [string, any[]]) => {
    const [sql, parameters] = queryAndParams;
    let index = 0;
    const newSql = sql.replace(/\?/g, () => {
        const parameter = parameters[index++];
        if (parameter instanceof Date) {
            return `'${new Date(parameter.getTime()).toISOString().split('.')[0].replace('T', ' ')}'`;
        }
        return (typeof(parameter) === 'boolean' || typeof(parameter) === 'number') ? `${parameter}` : `'${parameter}'`;
    });
    logger.info(newSql);
};
