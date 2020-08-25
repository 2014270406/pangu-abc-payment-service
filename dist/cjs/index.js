"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var entity_1 = require("./entity");
var AbcAccountRecordService_1 = require("./service/AbcAccountRecordService");
var AbcOrderRecordService_1 = require("./service/AbcOrderRecordService");
var common_utils_1 = require("@infoloop-opensource/common-utils");
var typeorm_hacks_1 = require("@infoloop-opensource/typeorm-hacks");
var AbcPaymentServices = /** @class */ (function () {
    function AbcPaymentServices(databaseName, context) {
        this.AbcAccountRecordEx = common_utils_1.decorateClass(entity_1.AbcAccountRecord, typeorm_hacks_1.HackedEntity({
            name: "abc_account_records",
            database: databaseName
        }));
        this.AbcOrderRecordEx = common_utils_1.decorateClass(entity_1.AbcOrderRecord, typeorm_hacks_1.HackedEntity({
            name: "abc_order_records",
            database: databaseName
        }));
        this.context = context;
    }
    AbcPaymentServices.prototype.initialize = function (masterConnection, replicationConnection, abcAccountRecordUpdateHook, abcOrderRecordUpdateHook) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._abcAccountRecordService = new AbcAccountRecordService_1.AbcAccountRecordService(this.AbcAccountRecordEx, masterConnection, replicationConnection, abcAccountRecordUpdateHook);
                this._abcOrderRecordService = new AbcOrderRecordService_1.AbcOrderRecordService(this.AbcOrderRecordEx, masterConnection, replicationConnection, abcOrderRecordUpdateHook);
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(AbcPaymentServices.prototype, "entities", {
        get: function () {
            return [this.AbcOrderRecordEx, this.AbcAccountRecordEx];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbcPaymentServices.prototype, "abcAccountRecordService", {
        get: function () {
            if (!this._abcAccountRecordService) {
                this.context.logger.error('AbcAccountRecordService not initialized...');
                throw Error('AbcAccountRecordService not initialized...');
            }
            return this._abcAccountRecordService;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbcPaymentServices.prototype, "abcOrderRecordService", {
        get: function () {
            if (!this._abcOrderRecordService) {
                this.context.logger.error('AbcOrderRecordService not initialized...');
                throw Error('AbcOrderRecordService not initialized...');
            }
            return this._abcOrderRecordService;
        },
        enumerable: true,
        configurable: true
    });
    return AbcPaymentServices;
}());
exports.AbcPaymentServices = AbcPaymentServices;
var entity_2 = require("./entity");
exports.AbcOrderRecord = entity_2.AbcOrderRecord;
exports.AbcAccountRecord = entity_2.AbcAccountRecord;
exports.AbcPayStatus = entity_2.AbcPayStatus;
var AbcOrderRecordService_2 = require("./service/AbcOrderRecordService");
exports.AbcOrderRecordService = AbcOrderRecordService_2.AbcOrderRecordService;
var AbcAccountRecordService_2 = require("./service/AbcAccountRecordService");
exports.AbcAccountRecordService = AbcAccountRecordService_2.AbcAccountRecordService;
