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
var AbcOrderRecordDao_1 = require("../dao/AbcOrderRecordDao");
var AbcOrderRecordService = /** @class */ (function () {
    function AbcOrderRecordService(AbcOrderRecordEx, masterConnection, replicationConnection, recordUpdateHook) {
        this.masterConnection = masterConnection;
        this.replicationConnection = replicationConnection;
        this.AbcOrderRecordDAO = new AbcOrderRecordDao_1.AbcOrderRecordDAO(AbcOrderRecordEx);
        this.masterEntityManager = masterConnection.manager;
        this.replicaEntityManager = replicationConnection.manager;
        this.recordUpdateHook = recordUpdateHook;
    }
    AbcOrderRecordService.prototype.switchConnection = function (connection) {
        if (connection === 'master') {
            return this.masterEntityManager;
        }
        return this.replicaEntityManager;
    };
    AbcOrderRecordService.prototype.getOrderRecordById = function (subjectId, id, context, connectionType) {
        if (connectionType === void 0) { connectionType = 'replica'; }
        return __awaiter(this, void 0, void 0, function () {
            var entityManager, record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entityManager = this.switchConnection(connectionType);
                        return [4 /*yield*/, this.AbcOrderRecordDAO.getOrderRecordById(subjectId, id, entityManager, context)];
                    case 1:
                        record = _a.sent();
                        return [2 /*return*/, record];
                }
            });
        });
    };
    AbcOrderRecordService.prototype.getRecordsByIds = function (subjectId, ids, context, connectionType) {
        if (connectionType === void 0) { connectionType = 'replica'; }
        return __awaiter(this, void 0, void 0, function () {
            var entityManager, records;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entityManager = this.switchConnection(connectionType);
                        return [4 /*yield*/, this.AbcOrderRecordDAO.getRecordsByIds(subjectId, ids, entityManager, context)];
                    case 1:
                        records = _a.sent();
                        return [2 /*return*/, records];
                }
            });
        });
    };
    AbcOrderRecordService.prototype.getRecordsBySubjectId = function (subjectId, context, connectionType) {
        if (connectionType === void 0) { connectionType = 'replica'; }
        return __awaiter(this, void 0, void 0, function () {
            var entityManager, records;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entityManager = this.switchConnection(connectionType);
                        return [4 /*yield*/, this.AbcOrderRecordDAO.getRecordsBySubjectId(subjectId, entityManager, context)];
                    case 1:
                        records = _a.sent();
                        return [2 /*return*/, records];
                }
            });
        });
    };
    AbcOrderRecordService.prototype.getRecordsByCondition = function (subjectId, orderIds, orderCode, abcTranNos, payStatus, recordAtLowerBound, recordAtUpperBound, timezone, includedDeleted, context, connectionType) {
        if (connectionType === void 0) { connectionType = 'replica'; }
        return __awaiter(this, void 0, void 0, function () {
            var entityManager;
            return __generator(this, function (_a) {
                entityManager = this.switchConnection(connectionType);
                return [2 /*return*/, this.AbcOrderRecordDAO.getRecordsByCondition(subjectId, orderIds, orderCode, abcTranNos, payStatus, recordAtLowerBound, recordAtUpperBound, timezone, entityManager, context, includedDeleted)];
            });
        });
    };
    AbcOrderRecordService.prototype.createOrderRecord = function (subjectId, orderId, orderCode, transactionNo, abcTranNo, abcMeta, payStatus, company, supplierId, amount, creator, context) {
        return __awaiter(this, void 0, void 0, function () {
            var entityManager, record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entityManager = this.switchConnection('master');
                        return [4 /*yield*/, this.AbcOrderRecordDAO.createOrderRecord(subjectId, orderId, orderCode, transactionNo, abcTranNo, abcMeta, payStatus, company, supplierId, amount, creator, entityManager, context)];
                    case 1:
                        record = _a.sent();
                        if (this.recordUpdateHook) {
                            this.recordUpdateHook([record.id]);
                        }
                        return [2 /*return*/, record];
                }
            });
        });
    };
    AbcOrderRecordService.prototype.updateOrderRecordById = function (subjectId, id, payStatus, amount, updater, context) {
        return __awaiter(this, void 0, void 0, function () {
            var entityManager;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entityManager = this.switchConnection('master');
                        return [4 /*yield*/, this.AbcOrderRecordDAO.updateOrderRecordById(subjectId, id, payStatus, amount, updater, entityManager, context)];
                    case 1:
                        _a.sent();
                        if (this.recordUpdateHook) {
                            this.recordUpdateHook([id]);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AbcOrderRecordService.prototype.deleteRecordsByIds = function (subjectId, ids, deleter, context) {
        return __awaiter(this, void 0, void 0, function () {
            var entityManager;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entityManager = this.switchConnection('master');
                        return [4 /*yield*/, this.AbcOrderRecordDAO.deleteRecordsByIds(subjectId, ids, deleter, entityManager, context)];
                    case 1:
                        _a.sent();
                        if (this.recordUpdateHook) {
                            this.recordUpdateHook(ids);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return AbcOrderRecordService;
}());
exports.AbcOrderRecordService = AbcOrderRecordService;
