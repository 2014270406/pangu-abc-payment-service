var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AbcOrderRecordDAO } from "../dao/AbcOrderRecordDao";
export class AbcOrderRecordService {
    constructor(AbcOrderRecordEx, masterConnection, replicationConnection, recordUpdateHook) {
        this.masterConnection = masterConnection;
        this.replicationConnection = replicationConnection;
        this.AbcOrderRecordDAO = new AbcOrderRecordDAO(AbcOrderRecordEx);
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
    getOrderRecordById(subjectId, id, context, connectionType = 'replica') {
        return __awaiter(this, void 0, void 0, function* () {
            const entityManager = this.switchConnection(connectionType);
            const record = yield this.AbcOrderRecordDAO.getOrderRecordById(subjectId, id, entityManager, context);
            return record;
        });
    }
    getRecordsByIds(subjectId, ids, context, connectionType = 'replica') {
        return __awaiter(this, void 0, void 0, function* () {
            const entityManager = this.switchConnection(connectionType);
            const records = yield this.AbcOrderRecordDAO.getRecordsByIds(subjectId, ids, entityManager, context);
            return records;
        });
    }
    getRecordsBySubjectId(subjectId, context, connectionType = 'replica') {
        return __awaiter(this, void 0, void 0, function* () {
            const entityManager = this.switchConnection(connectionType);
            const records = yield this.AbcOrderRecordDAO.getRecordsBySubjectId(subjectId, entityManager, context);
            return records;
        });
    }
    getRecordsByCondition(subjectId, orderIds, orderCode, abcTranNos, payStatus, recordAtLowerBound, recordAtUpperBound, timezone, includedDeleted, context, connectionType = 'replica') {
        return __awaiter(this, void 0, void 0, function* () {
            const entityManager = this.switchConnection(connectionType);
            return this.AbcOrderRecordDAO.getRecordsByCondition(subjectId, orderIds, orderCode, abcTranNos, payStatus, recordAtLowerBound, recordAtUpperBound, timezone, entityManager, context, includedDeleted);
        });
    }
    createOrderRecord(subjectId, orderId, orderCode, transactionNo, abcTranNo, abcMeta, payStatus, supplierId, amount, creator, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const entityManager = this.switchConnection('master');
            const record = yield this.AbcOrderRecordDAO.createOrderRecord(subjectId, orderId, orderCode, transactionNo, abcTranNo, abcMeta, payStatus, supplierId, amount, creator, entityManager, context);
            if (this.recordUpdateHook) {
                this.recordUpdateHook([record.id]);
            }
            return record;
        });
    }
    updateOrderRecordById(subjectId, id, payStatus, amount, updater, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const entityManager = this.switchConnection('master');
            yield this.AbcOrderRecordDAO.updateOrderRecordById(subjectId, id, payStatus, amount, updater, entityManager, context);
            if (this.recordUpdateHook) {
                this.recordUpdateHook([id]);
            }
        });
    }
    deleteRecordsByIds(subjectId, ids, deleter, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const entityManager = this.switchConnection('master');
            yield this.AbcOrderRecordDAO.deleteRecordsByIds(subjectId, ids, deleter, entityManager, context);
            if (this.recordUpdateHook) {
                this.recordUpdateHook(ids);
            }
        });
    }
}
