import { DeepPartial, EntityManager, FindConditions, In } from 'typeorm';
import {
    AbcAccountRecord 
} from '../entity';
import { Context, logSql } from '../type/Context';
import { toDBDateString, keywordToLikeQuery } from 'common-utils';
import { Class } from '@infoloop-opensource/abstractions';
import { CollectionUtils } from '@infoloop-opensource/common-utils';

const { isEmptyNonnullArray } = CollectionUtils;

export class AbcAccountRecordDAO {
    private AbcAccountRecordEx: Class<AbcAccountRecord>;

    constructor(AbcAccountRecordEx: Class<AbcAccountRecord>) {
        this.AbcAccountRecordEx = AbcAccountRecordEx;
    }

    public async getAccountRecordById(subjectId: number | undefined,
                                      id: number,
                                      entityManager: EntityManager,
                                      context: Context): Promise<AbcAccountRecord | undefined> {
        const repo = entityManager.getRepository(this.AbcAccountRecordEx);
        const where: FindConditions<AbcAccountRecord> = {
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
    }

    public async getRecordsByIds(subjectId: number | undefined,
                                 ids: number[],
                                 entityManager: EntityManager,
                                 context: Context,
                                 includeDeleted = false): Promise<AbcAccountRecord[]> {
        if (ids.length === 0) {
            return [];
        }
        const condition: FindConditions<AbcAccountRecord> = {
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
    }

    public async getRecordsByCondition(subjectId: number | undefined,
                                       dealerIds: number[] | undefined,
                                       name: string | undefined,
                                       code: string | undefined,
                                       mobile: string | undefined,
                                       recordAtLowerBound: Date | undefined,
                                       recordAtUpperBound: Date | undefined,
                                       timezone: number,
                                       entityManager: EntityManager,
                                       context: Context): Promise<AbcAccountRecord[]> {
        if (dealerIds && dealerIds.length === 0) {
            return [];
        }
        let whereSQL = ` isDeleted = 0 `;
        if (subjectId !== undefined) {
            whereSQL = whereSQL.concat(` AND subjectId = ${subjectId}`);
        }
        if (dealerIds) {
            whereSQL = whereSQL.concat(` AND dealerId in (${dealerIds.map(m => "'" + m + "'").join(',')}) `);
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
    }

    public async createAccountRecord(subjectId: number,
                                     dealerId: string,
                                     name: string,
                                     code: string,
                                     mobile: string,
                                     detailJson: string,
                                     creator: number,
                                     entityManager: EntityManager,
                                     context: Context): Promise<AbcAccountRecord> {
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
        const result = await queryBuilder.execute();
        record.id = result.identifiers[0].id;
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
                                         entityManager: EntityManager,
                                         context: Context): Promise<void> {
        if (!(name !== undefined || dealerId !== undefined || code !== undefined || mobile !== undefined || detailJson !== undefined)) {
            return;
        }
        const condition: FindConditions<AbcAccountRecord> = {
            id,
            isDeleted: false
        };
        if (subjectId !== undefined) {
            condition.subjectId = subjectId;
        }
        const toUpdate: DeepPartial<AbcAccountRecord> = {
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
        await queryBuilder.execute();
    }

    public async deleteRecordsByIds(subjectId: number | undefined,
                                    ids: number[] | undefined,
                                    deleter: number,
                                    entityManager: EntityManager,
                                    context: Context): Promise<void> {
        if (ids && ids.length === 0) {
            return;
        }
        const condition: FindConditions<AbcAccountRecord> = {
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
        await queryBuilder.execute();
    }
}
