var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AbcAccountRecordDAO } from "../dao/AbcAccountRecordDao";
export class AbcAccountRecordService {
    constructor(AbcAccountRecordEx, masterConnection, replicationConnection, recordUpdateHook) {
        this.masterConnection = masterConnection;
        this.replicationConnection = replicationConnection;
        this.AbcAccountRecordDAO = new AbcAccountRecordDAO(AbcAccountRecordEx);
        this.masterEntityManager = masterConnection.manager;
        this.replicaEntityManager = replicationConnection.manager;
        this.recordUpdateHook = recordUpdateHook;
    }
    switchConnection(connection) {
        if (connection === 'master') {
            return this.masterEntityManager;
        }
        return this.replicaEntityManager;
    }
    getAccountRecordById(subjectId, id, context, connectionType = 'replica') {
        return __awaiter(this, void 0, void 0, function* () {
            const entityManager = this.switchConnection(connectionType);
            const record = yield this.AbcAccountRecordDAO.getAccountRecordById(subjectId, id, entityManager, context);
            return record;
        });
    }
    getRecordsByIds(subjectId, ids, context, connectionType = 'replica') {
        return __awaiter(this, void 0, void 0, function* () {
            const entityManager = this.switchConnection(connectionType);
            const records = yield this.AbcAccountRecordDAO.getRecordsByIds(subjectId, ids, entityManager, context);
            return records;
        });
    }
    getRecordsByCondition(subjectId, dealerIds, name, code, mobile, recordAtLowerBound, recordAtUpperBound, timezone, context, connectionType = 'replica') {
        return __awaiter(this, void 0, void 0, function* () {
            const entityManager = this.switchConnection(connectionType);
            const records = yield this.AbcAccountRecordDAO.getRecordsByCondition(subjectId, dealerIds, name, code, mobile, recordAtLowerBound, recordAtUpperBound, timezone, entityManager, context);
            return records;
        });
    }
    createAccountRecord(subjectId, dealerId, name, code, mobile, detailJson, creator, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const entityManager = this.switchConnection('master');
            const record = yield this.AbcAccountRecordDAO.createAccountRecord(subjectId, dealerId, name, code, mobile, detailJson, creator, entityManager, context);
            if (this.recordUpdateHook) {
                this.recordUpdateHook([record.id]);
            }
            return record;
        });
    }
    updateAccountRecordById(subjectId, id, dealerId, name, code, mobile, detailJson, updater, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const entityManager = this.switchConnection('master');
            yield this.AbcAccountRecordDAO.updateAccountRecordById(subjectId, id, dealerId, name, code, mobile, detailJson, updater, entityManager, context);
            if (this.recordUpdateHook) {
                this.recordUpdateHook([id]);
            }
        });
    }
    deleteRecordsByIds(subjectId, ids, deleter, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const entityManager = this.switchConnection('master');
            yield this.AbcAccountRecordDAO.deleteRecordsByIds(subjectId, ids, deleter, entityManager, context);
            if (this.recordUpdateHook) {
                this.recordUpdateHook(ids);
            }
        });
    }
}
