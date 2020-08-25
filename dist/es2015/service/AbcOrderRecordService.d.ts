import { Connection } from 'typeorm';
import { Class, Consumer } from "@infoloop-opensource/abstractions";
import { AbcOrderRecord, AbcPayStatus } from '../entity';
import { Context } from '../type/Context';
declare type ConnectionType = 'master' | 'replica';
export declare class AbcOrderRecordService {
    private readonly masterConnection;
    private readonly replicationConnection;
    private readonly AbcOrderRecordDAO;
    private readonly masterEntityManager;
    private readonly replicaEntityManager;
    private readonly recordUpdateHook;
    constructor(AbcOrderRecordEx: Class<AbcOrderRecord>, masterConnection: Connection, replicationConnection: Connection, recordUpdateHook: Consumer<number[]> | undefined);
    private switchConnection;
    getOrderRecordById(subjectId: number | undefined, id: number, context: Context, connectionType?: ConnectionType): Promise<AbcOrderRecord | undefined>;
    getRecordsByIds(subjectId: number | undefined, ids: number[], context: Context, connectionType?: ConnectionType): Promise<AbcOrderRecord[]>;
    getRecordsBySubjectId(subjectId: number, context: Context, connectionType?: ConnectionType): Promise<AbcOrderRecord[]>;
    getRecordsByCondition(subjectId: number | undefined, orderIds: number[] | undefined, orderCode: string | undefined, abcTranNos: string[] | undefined, payStatus: AbcPayStatus | undefined, recordAtLowerBound: Date | undefined, recordAtUpperBound: Date | undefined, timezone: number, includedDeleted: boolean, context: Context, connectionType?: ConnectionType): Promise<AbcOrderRecord[]>;
    createOrderRecord(subjectId: number, orderId: number, orderCode: string, transactionNo: string, abcTranNo: string, abcMeta: string, payStatus: AbcPayStatus, supplierId: number, amount: number, creator: number, context: Context): Promise<AbcOrderRecord>;
    updateOrderRecordById(subjectId: number | undefined, id: number, payStatus: AbcPayStatus | undefined, amount: number | undefined, updater: number, context: Context): Promise<void>;
    deleteRecordsByIds(subjectId: number | undefined, ids: number[] | undefined, deleter: number, context: Context): Promise<void>;
}
export {};
