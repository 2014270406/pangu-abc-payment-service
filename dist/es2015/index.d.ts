import { Connection } from 'typeorm';
import { AbcAccountRecord, AbcOrderRecord } from './entity';
import { AbcAccountRecordService } from './service/AbcAccountRecordService';
import { AbcOrderRecordService } from './service/AbcOrderRecordService';
import { Context } from './type/Context';
import { Consumer } from '@infoloop-opensource/abstractions';
export declare class AbcPaymentServices {
    private readonly AbcAccountRecordEx;
    private readonly AbcOrderRecordEx;
    private readonly context;
    private _abcAccountRecordService;
    private _abcOrderRecordService;
    constructor(databaseName: string, context: Context);
    initialize(masterConnection: Connection, replicationConnection: Connection, abcAccountRecordUpdateHook: Consumer<number[]> | undefined, abcRuleRecordUpdateHook: Consumer<number[]> | undefined, abcOrderRecordUpdateHook: Consumer<number[]> | undefined): Promise<void>;
    readonly entities: (import("@infoloop-opensource/abstractions").Constructor<AbcAccountRecord> | import("@infoloop-opensource/abstractions").Constructor<AbcOrderRecord>)[];
    readonly abcAccountRecordService: AbcAccountRecordService;
    readonly abcOrderRecordService: AbcOrderRecordService;
}
export { AbcOrderRecord, AbcAccountRecord, AbcPayStatus } from './entity';
export { AbcOrderRecordService } from './service/AbcOrderRecordService';
export { AbcAccountRecordService } from './service/AbcAccountRecordService';
