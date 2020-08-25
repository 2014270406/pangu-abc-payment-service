import {readFileSync, writeFileSync} from 'fs';

const definitions = readFileSync('sql/tables.sql').toString();
const drops = readFileSync('sql/cleanTables.sql').toString();
const insertions = readFileSync('sql/insertTestData.sql').toString();
writeFileSync('sql/sql.json', JSON.stringify({
    definitions: definitions.split(/;[\n]+/).filter(sql => sql !== ''),
    drops: drops.split(/;[\n]+/).filter(sql => sql !== ''),
    insertions: insertions.split(/;[\n]+/).filter(sql => sql !== '')
}));
console.log('Generated sql/sql.json');
