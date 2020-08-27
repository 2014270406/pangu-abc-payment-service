import { Connection } from 'typeorm';
import { Class, Consumer } from "@infoloop-opensource/abstractions";
import { AbcAccountRecord } from '../entity';
import { Context } from '../type/Context';
declare type ConnectionType = 'master' | 'replica';
export declare class AbcAccountRecordService {
    private readonly masterConnection;
    private readonly replicationConnection;
    private readonly AbcAccountRecordDAO;
    private readonly masterEntityManager;
    private readonly replicaEntityManager;
    private readonly recordUpdateHook;
    constructor(AbcAccountRecordEx: Class<AbcAccountRecord>, masterConnection: Connection, replicationConnection: Connection, recordUpdateHook: Consumer<number[]> | undefined);
    private switchConnection;
    getAccountRecordById(subjectId: number | undefined, id: number, context: Context, connectionType?: ConnectionType): Promise<AbcAccountRecord | undefined>;
    getRecordsByIds(subjectId: number | undefined, ids: number[], context: Context, connectionType?: ConnectionType): Promise<AbcAccountRecord[]>;
    getRecordsByCondition(subjectId: number | undefined, dealerIds: number[] | undefined, name: string | undefined, code: string | undefined, mobile: string | undefined, recordAtLowerBound: Date | undefined, recordAtUpperBound: Date | undefined, timezone: number, context: Context, connectionType?: ConnectionType): Promise<AbcAccountRecord[]>;
    createAccountRecord(subjectId: number, dealerId: string, name: string, code: string, mobile: string, detailJson: string, creator: number, context: Context): Promise<AbcAccountRecord>;
    updateAccountRecordById(subjectId: number | undefined, id: number, dealerId: string | undefined, name: string | undefined, code: string | undefined, mobile: string | undefined, detailJson: string | undefined, updater: number, context: Context): Promise<void>;
    deleteRecordsByIds(subjectId: number | undefined, ids: number[] | undefined, deleter: number, context: Context): Promise<void>;
}
export {};
