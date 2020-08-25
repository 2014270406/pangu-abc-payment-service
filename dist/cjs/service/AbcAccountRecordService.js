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
var AbcAccountRecordDao_1 = require("../dao/AbcAccountRecordDao");
var AbcAccountRecordService = /** @class */ (function () {
    function AbcAccountRecordService(AbcAccountRecordEx, masterConnection, replicationConnection, recordUpdateHook) {
        this.masterConnection = masterConnection;
        this.replicationConnection = replicationConnection;
        this.AbcAccountRecordDAO = new AbcAccountRecordDao_1.AbcAccountRecordDAO(AbcAccountRecordEx);
        this.masterEntityManager = masterConnection.manager;
        this.replicaEntityManager = replicationConnection.manager;
        this.recordUpdateHook = recordUpdateHook;
    }
    AbcAccountRecordService.prototype.switchConnection = function (connection) {
        if (connection === 'master') {
            return this.masterEntityManager;
        }
        return this.replicaEntityManager;
    };
    AbcAccountRecordService.prototype.getAccountRecordById = function (subjectId, id, context, connectionType) {
        if (connectionType === void 0) { connectionType = 'replica'; }
        return __awaiter(this, void 0, void 0, function () {
            var entityManager, record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entityManager = this.switchConnection(connectionType);
                        return [4 /*yield*/, this.AbcAccountRecordDAO.getAccountRecordById(subjectId, id, entityManager, context)];
                    case 1:
                        record = _a.sent();
                        return [2 /*return*/, record];
                }
            });
        });
    };
    AbcAccountRecordService.prototype.getRecordsByIds = function (subjectId, ids, context, connectionType) {
        if (connectionType === void 0) { connectionType = 'replica'; }
        return __awaiter(this, void 0, void 0, function () {
            var entityManager, records;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entityManager = this.switchConnection(connectionType);
                        return [4 /*yield*/, this.AbcAccountRecordDAO.getRecordsByIds(subjectId, ids, entityManager, context)];
                    case 1:
                        records = _a.sent();
                        return [2 /*return*/, records];
                }
            });
        });
    };
    AbcAccountRecordService.prototype.getRecordsByCondition = function (subjectId, dealerIds, name, code, mobile, recordAtLowerBound, recordAtUpperBound, timezone, context, connectionType) {
        if (connectionType === void 0) { connectionType = 'replica'; }
        return __awaiter(this, void 0, void 0, function () {
            var entityManager, records;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entityManager = this.switchConnection(connectionType);
                        return [4 /*yield*/, this.AbcAccountRecordDAO.getRecordsByCondition(subjectId, dealerIds, name, code, mobile, recordAtLowerBound, recordAtUpperBound, timezone, entityManager, context)];
                    case 1:
                        records = _a.sent();
                        return [2 /*return*/, records];
                }
            });
        });
    };
    AbcAccountRecordService.prototype.createAccountRecord = function (subjectId, dealerId, name, code, mobile, detailJson, creator, context) {
        return __awaiter(this, void 0, void 0, function () {
            var entityManager, record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entityManager = this.switchConnection('master');
                        return [4 /*yield*/, this.AbcAccountRecordDAO.createAccountRecord(subjectId, dealerId, name, code, mobile, detailJson, creator, entityManager, context)];
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
    AbcAccountRecordService.prototype.updateAccountRecordById = function (subjectId, id, dealerId, name, code, mobile, detailJson, updater, context) {
        return __awaiter(this, void 0, void 0, function () {
            var entityManager;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entityManager = this.switchConnection('master');
                        return [4 /*yield*/, this.AbcAccountRecordDAO.updateAccountRecordById(subjectId, id, dealerId, name, code, mobile, detailJson, updater, entityManager, context)];
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
    AbcAccountRecordService.prototype.deleteRecordsByIds = function (subjectId, ids, deleter, context) {
        return __awaiter(this, void 0, void 0, function () {
            var entityManager;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entityManager = this.switchConnection('master');
                        return [4 /*yield*/, this.AbcAccountRecordDAO.deleteRecordsByIds(subjectId, ids, deleter, entityManager, context)];
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
    return AbcAccountRecordService;
}());
exports.AbcAccountRecordService = AbcAccountRecordService;
