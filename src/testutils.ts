import {Connection} from 'typeorm';
import {definitions, drops} from 'common/sql/sql.json';

export const prepareDB = async (connection: Connection) => {
    for (const drop of drops) {
        await connection.query(drop);
    }
    for (const table of definitions) {
        await connection.query(table);
    }
};
