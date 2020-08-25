import { Connection } from 'typeorm';
import { AbcAccountRecord, AbcOrderRecord } from './entity';
import { AbcAccountRecordService } from './service/AbcAccountRecordService';
import { AbcOrderRecordService } from './service/AbcOrderRecordService';
import { Context } from './type/Context';
import { Class, Consumer } from '@infoloop-opensource/abstractions'
import { decorateClass } from '@infoloop-opensource/common-utils';
import { HackedEntity } from '@infoloop-opensource/typeorm-hacks';

export class AbcPaymentServices {
    private readonly AbcAccountRecordEx: Class<AbcAccountRecord>;
    private readonly AbcOrderRecordEx: Class<AbcOrderRecord>;
    private readonly context: Context;
    
    private _abcAccountRecordService: AbcAccountRecordService;
    private _abcOrderRecordService: AbcOrderRecordService;
    constructor(databaseName: string, context: Context) {
        this.AbcAccountRecordEx = decorateClass(AbcAccountRecord, HackedEntity<AbcAccountRecord>({
            name: `abc_account_records`,
            database: databaseName
        }));
        this.AbcOrderRecordEx = decorateClass(AbcOrderRecord, HackedEntity<AbcOrderRecord>({
            name: `abc_order_records`,
            database: databaseName
        }));
        this.context = context;
    }

    public async initialize(masterConnection: Connection, 
                            replicationConnection: Connection, 
                            abcAccountRecordUpdateHook: Consumer<number[]> | undefined, 
                            abcOrderRecordUpdateHook: Consumer<number[]> | undefined): Promise<void> {
        this._abcAccountRecordService = new AbcAccountRecordService(
            this.AbcAccountRecordEx,
            masterConnection,
            replicationConnection,
            abcAccountRecordUpdateHook
        );
        this._abcOrderRecordService = new AbcOrderRecordService(
            this.AbcOrderRecordEx,
            masterConnection,
            replicationConnection,
            abcOrderRecordUpdateHook
        );
    }

    public get entities() {
        return [this.AbcOrderRecordEx, this.AbcAccountRecordEx];
    }

    public get abcAccountRecordService(): AbcAccountRecordService {
        if (!this._abcAccountRecordService) {
            this.context.logger.error('AbcAccountRecordService not initialized...');
            throw Error('AbcAccountRecordService not initialized...');
        }
        return this._abcAccountRecordService;
    }

    public get abcOrderRecordService(): AbcOrderRecordService {
        if (!this._abcOrderRecordService) {
            this.context.logger.error('AbcOrderRecordService not initialized...');
            throw Error('AbcOrderRecordService not initialized...');
        }
        return this._abcOrderRecordService;
    }
}

export { AbcOrderRecord, AbcAccountRecord, AbcPayStatus } from './entity';
export { AbcOrderRecordService } from './service/AbcOrderRecordService';
export { AbcAccountRecordService } from './service/AbcAccountRecordService';
