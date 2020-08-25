import { EntityManager } from 'typeorm';
import { AbcAccountRecord } from '../entity';
import { Context } from '../type/Context';
import { Class } from '@infoloop-opensource/abstractions';
export declare class AbcAccountRecordDAO {
    private AbcAccountRecordEx;
    constructor(AbcAccountRecordEx: Class<AbcAccountRecord>);
    getAccountRecordById(subjectId: number | undefined, id: number, entityManager: EntityManager, context: Context): Promise<AbcAccountRecord | undefined>;
    getRecordsByIds(subjectId: number | undefined, ids: number[], entityManager: EntityManager, context: Context, includeDeleted?: boolean): Promise<AbcAccountRecord[]>;
    getRecordsByCondition(subjectId: number | undefined, dealerIds: number[] | undefined, name: string | undefined, code: string | undefined, mobile: string | undefined, recordAtLowerBound: Date | undefined, recordAtUpperBound: Date | undefined, timezone: number, entityManager: EntityManager, context: Context): Promise<AbcAccountRecord[]>;
    createAccountRecord(subjectId: number, dealerId: number, name: string, code: string, mobile: string, detailJson: string, creator: number, entityManager: EntityManager, context: Context): Promise<AbcAccountRecord>;
    updateAccountRecordById(subjectId: number | undefined, id: number, dealerId: number | undefined, name: string | undefined, code: string | undefined, mobile: string | undefined, detailJson: string | undefined, updater: number, entityManager: EntityManager, context: Context): Promise<void>;
    deleteRecordsByIds(subjectId: number | undefined, ids: number[] | undefined, deleter: number, entityManager: EntityManager, context: Context): Promise<void>;
}
