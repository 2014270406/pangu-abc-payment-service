export const logSql = (logger, queryAndParams) => {
    const [sql, parameters] = queryAndParams;
    let index = 0;
    const newSql = sql.replace(/\?/g, () => {
        const parameter = parameters[index++];
        if (parameter instanceof Date) {
            return `'${new Date(parameter.getTime()).toISOString().split('.')[0].replace('T', ' ')}'`;
        }
        return (typeof (parameter) === 'boolean' || typeof (parameter) === 'number') ? `${parameter}` : `'${parameter}'`;
    });
    logger.info(newSql);
};
