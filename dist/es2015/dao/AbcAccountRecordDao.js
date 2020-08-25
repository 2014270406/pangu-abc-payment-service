var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { In } from 'typeorm';
import { AbcAccountRecord } from '../entity';
import { logSql } from '../type/Context';
import { toDBDateString } from 'common-utils';
import { CollectionUtils } from '@infoloop-opensource/common-utils';
const { isEmptyNonnullArray } = CollectionUtils;
export class AbcAccountRecordDAO {
    constructor(AbcAccountRecordEx) {
        this.AbcAccountRecordEx = AbcAccountRecordEx;
    }
    getAccountRecordById(subjectId, id, entityManager, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = entityManager.getRepository(this.AbcAccountRecordEx);
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
            const queryBuilder = entityManager.getRepository(this.AbcAccountRecordEx).createQueryBuilder()
                .select()
                .where(condition);
            logSql(context.logger, queryBuilder.getQueryAndParameters());
            return queryBuilder.getMany();
        });
    }
    getRecordsByCondition(subjectId, dealerIds, name, code, mobile, recordAtLowerBound, recordAtUpperBound, timezone, entityManager, context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (dealerIds && dealerIds.length === 0) {
                return [];
            }
            let whereSQL = ` isDeleted = 0 `;
            if (subjectId !== undefined) {
                whereSQL = whereSQL.concat(` AND subjectId = ${subjectId}`);
            }
            if (dealerIds) {
                whereSQL = whereSQL.concat(` AND dealerId in (${dealerIds.join(',')}) `);
            }
            if (name !== undefined) {
                whereSQL = whereSQL.concat(` AND name = '${name}'`);
            }
            if (code !== undefined) {
                whereSQL = whereSQL.concat(` AND code = '${code}'`);
            }
            if (mobile !== undefined) {
                whereSQL = whereSQL.concat(` AND mobile = '${mobile}'`);
            }
            if (recordAtLowerBound) {
                whereSQL = whereSQL.concat(` AND createdAt >= '${toDBDateString(new Date(recordAtLowerBound), timezone)}' `);
            }
            if (recordAtUpperBound) {
                whereSQL = whereSQL.concat(` AND createdAt <'${toDBDateString(new Date(recordAtUpperBound), timezone)}' `);
            }
            const queryBuilder = entityManager.getRepository(this.AbcAccountRecordEx).createQueryBuilder()
                .select()
                .where(whereSQL);
            logSql(context.logger, queryBuilder.getQueryAndParameters());
            return queryBuilder.getMany();
        });
    }
    createAccountRecord(subjectId, dealerId, name, code, mobile, detailJson, creator, entityManager, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const systemTime = new Date();
            const record = new AbcAccountRecord();
            record.subjectId = subjectId;
            record.dealerId = dealerId;
            record.name = name;
            record.code = code;
            record.mobile = mobile;
            record.detailJson = detailJson;
            record.createdBy = creator;
            record.createdAt = systemTime;
            record.updatedBy = creator;
            record.updatedAt = systemTime;
            record.isDeleted = false;
            record.comment = '';
            const queryBuilder = entityManager.getRepository(this.AbcAccountRecordEx).createQueryBuilder()
                .insert()
                .values(record);
            logSql(context.logger, queryBuilder.getQueryAndParameters());
            const result = yield queryBuilder.execute();
            record.id = result.identifiers[0].id;
            return record;
        });
    }
    updateAccountRecordById(subjectId, id, dealerId, name, code, mobile, detailJson, updater, entityManager, context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(name !== undefined || dealerId !== undefined || code !== undefined || mobile !== undefined || detailJson !== undefined)) {
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
            if (dealerId !== undefined) {
                toUpdate.dealerId = dealerId;
            }
            if (name !== undefined) {
                toUpdate.name = name;
            }
            if (code !== undefined) {
                toUpdate.code = code;
            }
            if (mobile !== undefined) {
                toUpdate.mobile = mobile;
            }
            if (detailJson !== undefined) {
                toUpdate.detailJson = detailJson;
            }
            const queryBuilder = entityManager.getRepository(this.AbcAccountRecordEx).createQueryBuilder()
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
            const queryBuilder = entityManager.getRepository(this.AbcAccountRecordEx).createQueryBuilder()
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
