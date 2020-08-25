var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { In } from 'typeorm';
import { AbcOrderRecord, AbcPayStatus, } from '../entity';
import { logSql } from '../type/Context';
import { toDBDateString } from 'common-utils';
export class AbcOrderRecordDAO {
    constructor(AbcOrderRecordEx) {
        this.AbcOrderRecordEx = AbcOrderRecordEx;
    }
    getOrderRecordById(subjectId, id, entityManager, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = entityManager.getRepository(this.AbcOrderRecordEx);
            const where = {
                isDeleted: false,
                id
            };
            if (subjectId !== undefined) {
                where.subjectId = subjectId;
            }
            const queryBuilder = repo.createQueryBuilder()
                .select()
                .where(where);
            logSql(context.logger, queryBuilder.getQueryAndParameters());
            return queryBuilder.getOne();
        });
    }
    getRecordsByIds(subjectId, ids, entityManager, context, includeDeleted = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ids.length === 0) {
                return [];
            }
            const condition = {
                id: In(ids)
            };
            if (subjectId !== undefined) {
                condition.subjectId = subjectId;
            }
            if (!includeDeleted) {
                condition.isDeleted = false;
            }
            const queryBuilder = entityManager.getRepository(this.AbcOrderRecordEx).createQueryBuilder()
                .select()
                .where(condition);
            logSql(context.logger, queryBuilder.getQueryAndParameters());
            return queryBuilder.getMany();
        });
    }
    getRecordsBySubjectId(subjectId, entityManager, context, includedDeleted = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = {
                subjectId
            };
            if (!includedDeleted) {
                condition.isDeleted = false;
            }
            const queryBuilder = entityManager.getRepository(this.AbcOrderRecordEx).createQueryBuilder()
                .select()
                .where(condition);
            logSql(context.logger, queryBuilder.getQueryAndParameters());
            return queryBuilder.getMany();
        });
    }
    getRecordsByCondition(subjectId, orderIds, orderCode, abcTranNos, AbcPayStatus, recordAtLowerBound, recordAtUpperBound, timezone, entityManager, context, includedDeleted = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (orderIds && orderIds.length === 0) {
                return [];
            }
            if (abcTranNos && abcTranNos.length === 0) {
                return [];
            }
            let whereSQL = ``;
            if (includedDeleted) {
                whereSQL = ` 1 = 1 `;
            }
            else {
                whereSQL = ` isDeleted = 0 `;
            }
            if (subjectId !== undefined) {
                whereSQL = whereSQL.concat(` AND subjectId = ${subjectId}`);
            }
            if (recordAtLowerBound) {
                whereSQL = whereSQL.concat(` AND createdAt >= '${toDBDateString(new Date(recordAtLowerBound), timezone)}'`);
            }
            if (recordAtUpperBound) {
                whereSQL = whereSQL.concat(` AND createdAt <'${toDBDateString(new Date(recordAtUpperBound), timezone)}'`);
            }
            if (orderIds !== undefined) {
                whereSQL = whereSQL.concat(` AND orderId in (${orderIds.join(',')})`);
            }
            if (orderCode !== undefined) {
                whereSQL = whereSQL.concat(` AND orderCode = '${orderCode}'`);
            }
            if (abcTranNos !== undefined) {
                whereSQL = whereSQL.concat(` AND abcTranNo in (${abcTranNos.map(m => "'" + m + "'").join(',')}) `);
            }
            if (AbcPayStatus !== undefined) {
                whereSQL = whereSQL.concat(` AND AbcPayStatus = ${AbcPayStatus}`);
            }
            const queryBuilder = entityManager.getRepository(this.AbcOrderRecordEx).createQueryBuilder()
                .select()
                .where(whereSQL);
            logSql(context.logger, queryBuilder.getQueryAndParameters());
            return queryBuilder.getMany();
        });
    }
    createOrderRecord(subjectId, orderId, orderCode, transactionNo, abcTranNo, abcMeta, payStatus, supplierId, amount, creator, entityManager, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const systemTime = new Date();
            const record = new AbcOrderRecord();
            record.subjectId = subjectId;
            record.orderId = orderId;
            record.orderCode = orderCode;
            record.transactionNo = transactionNo;
            record.abcTranNo = abcTranNo;
            record.abcMeta = abcMeta;
            record.payStatus = payStatus;
            record.supplierId = supplierId;
            record.amount = amount;
            record.createdBy = creator;
            record.createdAt = systemTime;
            record.updatedBy = creator;
            record.updatedAt = systemTime;
            record.isDeleted = false;
            record.comment = '';
            const queryBuilder = entityManager.getRepository(this.AbcOrderRecordEx).createQueryBuilder()
                .insert()
                .values(record);
            logSql(context.logger, queryBuilder.getQueryAndParameters());
            const result = yield queryBuilder.execute();
            record.id = result.identifiers[0].id;
            return record;
        });
    }
    updateOrderRecordById(subjectId, id, payStatus, amount, updater, entityManager, context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(AbcPayStatus !== undefined || amount !== undefined)) {
                return;
            }
            const condition = {
                id,
                isDeleted: false
            };
            if (subjectId !== undefined) {
                condition.subjectId = subjectId;
            }
            const toUpdate = {
                updatedBy: updater,
                updatedAt: new Date()
            };
            if (payStatus !== undefined) {
                toUpdate.payStatus = payStatus;
            }
            if (amount !== undefined) {
                toUpdate.amount = amount;
            }
            const queryBuilder = entityManager.getRepository(this.AbcOrderRecordEx).createQueryBuilder()
                .update()
                .set(toUpdate)
                .where(condition);
            logSql(context.logger, queryBuilder.getQueryAndParameters());
            yield queryBuilder.execute();
        });
    }
    deleteRecordsByIds(subjectId, ids, deleter, entityManager, context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ids && ids.length === 0) {
                return;
            }
            const condition = {
                isDeleted: false
            };
            if (subjectId !== undefined) {
                condition.subjectId = subjectId;
            }
            if (ids !== undefined) {
                condition.id = In(ids);
            }
            const queryBuilder = entityManager.getRepository(this.AbcOrderRecordEx).createQueryBuilder()
                .update()
                .set({
                updatedBy: deleter,
                updatedAt: new Date(),
                isDeleted: true
            })
                .where(condition);
            logSql(context.logger, queryBuilder.getQueryAndParameters());
            yield queryBuilder.execute();
        });
    }
}
