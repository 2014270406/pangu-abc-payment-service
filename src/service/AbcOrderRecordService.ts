import { Connection, EntityManager } from 'typeorm';
import { Class, Consumer } from "@infoloop-opensource/abstractions";
import { AbcOrderRecordDAO } from "../dao/AbcOrderRecordDao";
import { AbcOrderRecord, AbcPayStatus } from '../entity';
import { Context } from '../type/Context';

type ConnectionType = 'master' | 'replica';

export class AbcOrderRecordService {
    private readonly masterConnection: Connection;
    private readonly replicationConnection: Connection;
    private readonly AbcOrderRecordDAO: AbcOrderRecordDAO;
    private readonly masterEntityManager: EntityManager;
    private readonly replicaEntityManager: EntityManager;
    private readonly recordUpdateHook: Consumer<number[]> | undefined;

    constructor(AbcOrderRecordEx: Class<AbcOrderRecord>,
                masterConnection: Connection,
                replicationConnection: Connection,
                recordUpdateHook: Consumer<number[]> | undefined) {
        this.masterConnection = masterConnection;
        this.replicationConnection = replicationConnection;
        this.AbcOrderRecordDAO = new AbcOrderRecordDAO(AbcOrderRecordEx);
        this.masterEntityManager = masterConnection.manager;
        this.replicaEntityManager = replicationConnection.manager;     
        this.recordUpdateHook = recordUpdateHook;   
    }

    private switchConnection(connection: ConnectionType): EntityManager {
        if (connection === 'master') {
            return this.masterEntityManager;
        }
        return this.replicaEntityManager;
    }

    public async getOrderRecordById(subjectId: number | undefined, 
                                    id: number,
                                    context: Context, 
                                    connectionType: ConnectionType = 'replica'): Promise<AbcOrderRecord | undefined> { 
        const entityManager = this.switchConnection(connectionType);
        const record = await this.AbcOrderRecordDAO.getOrderRecordById(subjectId, id, entityManager, context);
        return record;
    } 

    public async getRecordsByIds(subjectId: number | undefined,
                                 ids: number[],
                                 context: Context,
                                 connectionType: ConnectionType = 'replica'): Promise<AbcOrderRecord[]> {
        const entityManager = this.switchConnection(connectionType);
        const records = await this.AbcOrderRecordDAO.getRecordsByIds(subjectId, ids, entityManager, context);
        return records;
    }

    public async getRecordsBySubjectId(subjectId: number,
                                       context: Context,
                                       connectionType: ConnectionType = 'replica'): Promise<AbcOrderRecord[]> {
        const entityManager = this.switchConnection(connectionType);
        const records: AbcOrderRecord[] = await this.AbcOrderRecordDAO.getRecordsBySubjectId(subjectId, entityManager, context);
        return records;
    }

    public async getRecordsByCondition(subjectId: number | undefined,
                                       orderIds: number[] | undefined,
                                       orderCode: string | undefined,
                                       abcTranNos: string[] | undefined,
                                       payStatus: AbcPayStatus | undefined,
                                       recordAtLowerBound: Date | undefined,
                                       recordAtUpperBound: Date | undefined,
                                       timezone: number,
                                       includedDeleted: boolean,
                                       context: Context,
                                       connectionType: ConnectionType = 'replica'): Promise<AbcOrderRecord[]> {
        const entityManager = this.switchConnection(connectionType);
        return this.AbcOrderRecordDAO.getRecordsByCondition(
            subjectId, 
            orderIds,
            orderCode,
            abcTranNos,
            payStatus,
            recordAtLowerBound,
            recordAtUpperBound,
            timezone,
            entityManager,
            context,
            includedDeleted);
    }

    public async createOrderRecord(subjectId: number,
                                   orderId: number,
                                   orderCode: string,
                                   transactionNo: string,
                                   abcTranNo: string,
                                   abcMeta: string,
                                   payStatus: AbcPayStatus,
                                   supplierId: number,
                                   amount: number,
                                   creator: number,
                                   context: Context): Promise<AbcOrderRecord> {
        const entityManager = this.switchConnection('master');
        const record = await this.AbcOrderRecordDAO.createOrderRecord(
            subjectId,
            orderId,
            orderCode,
            transactionNo,
            abcTranNo,
            abcMeta,
            payStatus,
            supplierId,
            amount,
            creator,
            entityManager,
            context);
        if (this.recordUpdateHook) {
            this.recordUpdateHook([record.id]);
        }
        return record;
    }

    public async updateOrderRecordById(subjectId: number | undefined,
                                       id: number,
                                       payStatus: AbcPayStatus | undefined,
                                       amount: number | undefined,
                                       updater: number,
                                       context: Context): Promise<void> {
        const entityManager = this.switchConnection('master');
        await this.AbcOrderRecordDAO.updateOrderRecordById(subjectId, id, payStatus, amount, updater, entityManager, context);
        if (this.recordUpdateHook) {
            this.recordUpdateHook([id]);
        }
    }
    
    public async deleteRecordsByIds(subjectId: number | undefined,
                                    ids: number[] | undefined,
                                    deleter: number,
                                    context: Context): Promise<void> {
        const entityManager = this.switchConnection('master');
        await this.AbcOrderRecordDAO.deleteRecordsByIds(subjectId, ids, deleter, entityManager, context);
        if (this.recordUpdateHook) {
            this.recordUpdateHook(ids);
        }
    }

}
