var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AbcAccountRecord, AbcOrderRecord } from './entity';
import { AbcAccountRecordService } from './service/AbcAccountRecordService';
import { AbcOrderRecordService } from './service/AbcOrderRecordService';
import { decorateClass } from '@infoloop-opensource/common-utils';
import { HackedEntity } from '@infoloop-opensource/typeorm-hacks';
export class AbcPaymentServices {
    constructor(databaseName, context) {
        this.AbcAccountRecordEx = decorateClass(AbcAccountRecord, HackedEntity({
            name: `abc_account_records`,
            database: databaseName
        }));
        this.AbcOrderRecordEx = decorateClass(AbcOrderRecord, HackedEntity({
            name: `abc_order_records`,
            database: databaseName
        }));
        this.context = context;
    }
    initialize(masterConnection, replicationConnection, abcAccountRecordUpdateHook, abcRuleRecordUpdateHook, abcOrderRecordUpdateHook) {
        return __awaiter(this, void 0, void 0, function* () {
            this._abcAccountRecordService = new AbcAccountRecordService(this.AbcAccountRecordEx, masterConnection, replicationConnection, abcAccountRecordUpdateHook);
            this._abcOrderRecordService = new AbcOrderRecordService(this.AbcOrderRecordEx, masterConnection, replicationConnection, abcOrderRecordUpdateHook);
        });
    }
    get entities() {
        return [this.AbcOrderRecordEx, this.AbcAccountRecordEx];
    }
    get abcAccountRecordService() {
        if (!this._abcAccountRecordService) {
            this.context.logger.error('AbcAccountRecordService not initialized...');
            throw Error('AbcAccountRecordService not initialized...');
        }
        return this._abcAccountRecordService;
    }
    get abcOrderRecordService() {
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
