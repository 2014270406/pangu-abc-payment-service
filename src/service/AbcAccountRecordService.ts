import { Connection, EntityManager } from 'typeorm';
import { Class, Consumer } from "@infoloop-opensource/abstractions";
import { AbcAccountRecordDAO } from "../dao/AbcAccountRecordDao";
import { AbcAccountRecord } from '../entity';
import { Context } from '../type/Context';

type ConnectionType = 'master' | 'replica';

export class AbcAccountRecordService {
    private readonly masterConnection: Connection;
    private readonly replicationConnection: Connection;
    private readonly AbcAccountRecordDAO: AbcAccountRecordDAO;
    private readonly masterEntityManager: EntityManager;
    private readonly replicaEntityManager: EntityManager;
    private readonly recordUpdateHook: Consumer<number[]> | undefined;

    constructor(AbcAccountRecordEx: Class<AbcAccountRecord>,
                masterConnection: Connection,
                replicationConnection: Connection,
                recordUpdateHook: Consumer<number[]> | undefined) {
        this.masterConnection = masterConnection;
        this.replicationConnection = replicationConnection;
        this.AbcAccountRecordDAO = new AbcAccountRecordDAO(AbcAccountRecordEx);
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

    public async getAccountRecordById(subjectId: number | undefined, 
                                      id: number,
                                      context: Context, 
                                      connectionType: ConnectionType = 'replica'): Promise<AbcAccountRecord | undefined> { 
        const entityManager = this.switchConnection(connectionType);
        const record = await this.AbcAccountRecordDAO.getAccountRecordById(subjectId, id, entityManager, context);
        return record;
    } 

    public async getRecordsByIds(subjectId: number | undefined,
                                 ids: number[],
                                 context: Context,
                                 connectionType: ConnectionType = 'replica'): Promise<AbcAccountRecord[]> {
        const entityManager = this.switchConnection(connectionType);
        const records = await this.AbcAccountRecordDAO.getRecordsByIds(subjectId, ids, entityManager, context);
        return records;
    }

    public async getRecordsByCondition(subjectId: number | undefined,
                                       dealerIds: number[] | undefined,
                                       name: string | undefined,
                                       code: string | undefined,
                                       mobile: string | undefined,
                                       recordAtLowerBound: Date | undefined,
                                       recordAtUpperBound: Date | undefined,
                                       timezone: number, 
                                       context: Context,
                                       connectionType: ConnectionType = 'replica'): Promise<AbcAccountRecord[]> {
        const entityManager = this.switchConnection(connectionType);
        const records: AbcAccountRecord[] = await this.AbcAccountRecordDAO.getRecordsByCondition(subjectId, dealerIds, name, code, mobile, recordAtLowerBound, recordAtUpperBound, timezone, entityManager, context);
        return records;
    }

    public async createAccountRecord(subjectId: number,
                                     dealerId: string,
                                     name: string,
                                     code: string,
                                     mobile: string,
                                     detailJson: string,
                                     creator: number,
                                     context: Context): Promise<AbcAccountRecord> {
        const entityManager = this.switchConnection('master');
        const record = await this.AbcAccountRecordDAO.createAccountRecord(subjectId, dealerId, name, code, mobile, detailJson, creator, entityManager, context);
        if (this.recordUpdateHook) {
            this.recordUpdateHook([record.id]);
        }
        return record;
    }

    public async updateAccountRecordById(subjectId: number | undefined,
                                         id: number,
                                         dealerId: string | undefined,
                                         name: string | undefined,
                                         code: string | undefined,
                                         mobile: string | undefined,
                                         detailJson: string | undefined,
                                         updater: number,
                                         context: Context): Promise<void> {
        const entityManager = this.switchConnection('master');
        await this.AbcAccountRecordDAO.updateAccountRecordById(subjectId, id, dealerId, name, code, mobile, detailJson, updater, entityManager, context);
        if (this.recordUpdateHook) {
            this.recordUpdateHook([id]);
        }
    }

    public async deleteRecordsByIds(subjectId: number | undefined,
                                    ids: number[] | undefined,
                                    deleter: number,
                                    context: Context): Promise<void> {
        const entityManager = this.switchConnection('master');
        await this.AbcAccountRecordDAO.deleteRecordsByIds(subjectId, ids, deleter, entityManager, context);
        if (this.recordUpdateHook) {
            this.recordUpdateHook(ids);
        }
    }

}
