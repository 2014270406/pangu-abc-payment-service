import { EntityManager } from 'typeorm';
import { AbcOrderRecord, AbcPayStatus } from '../entity';
import { Context } from '../type/Context';
import { Class } from '@infoloop-opensource/abstractions';
export declare class AbcOrderRecordDAO {
    private AbcOrderRecordEx;
    constructor(AbcOrderRecordEx: Class<AbcOrderRecord>);
    getOrderRecordById(subjectId: number | undefined, id: number, entityManager: EntityManager, context: Context): Promise<AbcOrderRecord | undefined>;
    getRecordsByIds(subjectId: number | undefined, ids: number[], entityManager: EntityManager, context: Context, includeDeleted?: boolean): Promise<AbcOrderRecord[]>;
    getRecordsBySubjectId(subjectId: number, entityManager: EntityManager, context: Context, includedDeleted?: boolean): Promise<AbcOrderRecord[]>;
    getRecordsByCondition(subjectId: number | undefined, orderIds: number[] | undefined, orderCode: string | undefined, abcTranNos: string[] | undefined, AbcPayStatus: AbcPayStatus | undefined, recordAtLowerBound: Date | undefined, recordAtUpperBound: Date | undefined, timezone: number, entityManager: EntityManager, context: Context, includedDeleted?: boolean): Promise<AbcOrderRecord[]>;
    createOrderRecord(subjectId: number, orderId: number, orderCode: string, transactionNo: string, abcTranNo: string, abcMeta: string, payStatus: AbcPayStatus, supplierId: number, amount: number, creator: number, entityManager: EntityManager, context: Context): Promise<AbcOrderRecord>;
    updateOrderRecordById(subjectId: number | undefined, id: number, payStatus: AbcPayStatus | undefined, amount: number | undefined, updater: number, entityManager: EntityManager, context: Context): Promise<void>;
    deleteRecordsByIds(subjectId: number | undefined, ids: number[] | undefined, deleter: number, entityManager: EntityManager, context: Context): Promise<void>;
}
