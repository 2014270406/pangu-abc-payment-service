import { DeepPartial, EntityManager, FindConditions, In } from 'typeorm';
import {
    AbcOrderRecord,
    AbcPayStatus,
} from '../entity';
import { Context, logSql } from '../type/Context';
import { toDBDateString } from 'common-utils';
import { Class } from '@infoloop-opensource/abstractions';

export class AbcOrderRecordDAO {
    private AbcOrderRecordEx: Class<AbcOrderRecord>;

    constructor(AbcOrderRecordEx: Class<AbcOrderRecord>) {
        this.AbcOrderRecordEx = AbcOrderRecordEx;
    }

    public async getOrderRecordById(subjectId: number | undefined,
                                    id: number,
                                    entityManager: EntityManager,
                                    context: Context): Promise<AbcOrderRecord | undefined> {
        const repo = entityManager.getRepository(this.AbcOrderRecordEx);
        const where: FindConditions<AbcOrderRecord> = {
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
                                 includeDeleted = false): Promise<AbcOrderRecord[]> {
        if (ids.length === 0) {
            return [];
        }
        const condition: FindConditions<AbcOrderRecord> = {
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
    }

    public async getRecordsBySubjectId(subjectId: number,
                                       entityManager: EntityManager,
                                       context: Context,
                                       includedDeleted = false): Promise<AbcOrderRecord[]> {
        const condition: FindConditions<AbcOrderRecord> = {
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
    }

    public async getRecordsByCondition(subjectId: number | undefined,
                                       orderIds: number[] | undefined,
                                       orderCode: string | undefined,
                                       abcTranNos: string[] | undefined,
                                       AbcPayStatus: AbcPayStatus | undefined,
                                       recordAtLowerBound: Date | undefined,
                                       recordAtUpperBound: Date | undefined,
                                       timezone: number,
                                       entityManager: EntityManager,
                                       context: Context,
                                       includedDeleted = false): Promise<AbcOrderRecord[]> { 
        if (orderIds && orderIds.length === 0) {
            return [];
        }
        if (abcTranNos && abcTranNos.length === 0) {
            return [];
        }  
        let whereSQL = ``;
        if (includedDeleted) {
            whereSQL = ` 1 = 1 `;
        } else {
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
            .where(whereSQL)
        logSql(context.logger, queryBuilder.getQueryAndParameters());
        return queryBuilder.getMany();
    }

    public async createOrderRecord(subjectId: number,
                                   orderId: number,
                                   orderCode: string,
                                   transactionNo: string,
                                   abcTranNo: string,
                                   abcMeta: string,
                                   payStatus: AbcPayStatus,
                                   company: number,
                                   supplierId: number,
                                   amount: number,
                                   creator: number,
                                   entityManager: EntityManager,
                                   context: Context): Promise<AbcOrderRecord> {
        const systemTime = new Date();
        const record = new AbcOrderRecord();
            record.subjectId = subjectId;
            record.orderId = orderId;
            record.orderCode = orderCode;
            record.transactionNo = transactionNo;
            record.abcTranNo = abcTranNo;
            record.abcMeta = abcMeta;
            record.payStatus = payStatus;
            record.company = company;
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
        const result = await queryBuilder.execute();
        record.id = result.identifiers[0].id;
        return record;
    }

    public async updateOrderRecordById(subjectId: number | undefined,
                                       id: number,
                                       payStatus: AbcPayStatus | undefined,
                                       amount: number | undefined,
                                       updater: number,
                                       entityManager: EntityManager,
                                       context: Context): Promise<void> {
        if (!(AbcPayStatus !== undefined || amount !== undefined)) {
            return;
        }
        const condition: FindConditions<AbcOrderRecord> = {
            id,
            isDeleted: false
        };
        if (subjectId !== undefined) {
            condition.subjectId = subjectId;
        }
        const toUpdate: DeepPartial<AbcOrderRecord> = {
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
        const condition: FindConditions<AbcOrderRecord> = {
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
        await queryBuilder.execute();
    }
}
