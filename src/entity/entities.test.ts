import {Connection, createConnection} from 'typeorm';
import {prepareDB} from '../testutils';
import {
    AbcAccountRecord,
    AbcOrderRecord,
} from './index'
import {expect} from 'chai';
import * as config from '../../ormconfig.json';
import {Class} from '@infoloop-opensource/abstractions'
import {decorateClass} from '@infoloop-opensource/common-utils';
import {HackedEntity} from '@infoloop-opensource/typeorm-hacks';


describe('Entity definitions should match table definitions', async () => {
    const testTime = new Date(2000, 0, 1);

    let connection: Connection;
    let AbcOrderRecordEx: Class<AbcOrderRecord>;
    let AbcAccountRecordEx: Class<AbcAccountRecord>;

    before(async () => {
        AbcOrderRecordEx = decorateClass(AbcOrderRecord, HackedEntity<AbcOrderRecord>({
            name: 'abc_order_records',
            database: ''
        }));
        AbcAccountRecordEx = decorateClass(AbcAccountRecord, HackedEntity<AbcAccountRecord>({
            name: 'abc_account_records',
            database: ''
        }));
        connection = await createConnection({
            ...config,
            type: 'mysql',
            entities: [AbcAccountRecordEx, AbcOrderRecordEx],
            logging: false
        });
        await prepareDB(connection);
    });

    after(async () => {
        await connection.close();
    });

    it('AbcOrderRecord', async () => {
        const repo = connection.getRepository(AbcOrderRecordEx);
        const record = new AbcOrderRecord();
        record.id = 1;
        record.subjectId = 1;
        record.orderId = 1;
        record.orderCode = 'COC10001';
        record.transactionNo = 'abcM0001';
        record.abcTranNo = '10050123';
        record.abcMeta = '{}';
        record.payStatus = 0;
        record.supplierId = 0;
        record.amount = 1;
        record.updatedBy = record.createdBy = 0;
        record.updatedAt = record.createdAt = testTime;
        record.isDeleted = false;
        record.comment = 'unit test';
        const insertedRecord = await repo.save(record);
        expect(insertedRecord.id).to.equal(1);
        expect({...(await repo.findOne(1))}).to.deep.equal({...insertedRecord});
    });
   
    it('AbcAccountRecord', async () => {
        const repo = connection.getRepository(AbcAccountRecordEx);
        const record = new AbcAccountRecord();
        record.id = 1;
        record.subjectId = 1;
        record.dealerId= '100011';
        record.code = '13312345678';
        record.name = 'wang';
        record.mobile = '13312345678';
        record.detailJson = '';
        record.updatedBy = record.createdBy = 0;
        record.updatedAt = record.createdAt = testTime;
        record.isDeleted = false;
        record.comment = 'unit test';
        const insertedRecord = await repo.save(record);
        expect(insertedRecord.id).to.equal(1);
        expect({...(await repo.findOne(1))}).to.deep.equal({...insertedRecord});
    });

});
