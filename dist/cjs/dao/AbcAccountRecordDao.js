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
var typeorm_1 = require("typeorm");
var entity_1 = require("../entity");
var Context_1 = require("../type/Context");
var common_utils_1 = require("common-utils");
var common_utils_2 = require("@infoloop-opensource/common-utils");
var isEmptyNonnullArray = common_utils_2.CollectionUtils.isEmptyNonnullArray;
var AbcAccountRecordDAO = /** @class */ (function () {
    function AbcAccountRecordDAO(AbcAccountRecordEx) {
        this.AbcAccountRecordEx = AbcAccountRecordEx;
    }
    AbcAccountRecordDAO.prototype.getAccountRecordById = function (subjectId, id, entityManager, context) {
        return __awaiter(this, void 0, void 0, function () {
            var repo, where, queryBuilder;
            return __generator(this, function (_a) {
                repo = entityManager.getRepository(this.AbcAccountRecordEx);
                where = {
                    isDeleted: false,
                    id: id
                };
                if (subjectId !== undefined) {
                    where.subjectId = subjectId;
                }
                queryBuilder = repo.createQueryBuilder()
                    .select()
                    .where(where);
                Context_1.logSql(context.logger, queryBuilder.getQueryAndParameters());
                return [2 /*return*/, queryBuilder.getOne()];
            });
        });
    };
    AbcAccountRecordDAO.prototype.getRecordsByIds = function (subjectId, ids, entityManager, context, includeDeleted) {
        if (includeDeleted === void 0) { includeDeleted = false; }
        return __awaiter(this, void 0, void 0, function () {
            var condition, queryBuilder;
            return __generator(this, function (_a) {
                if (ids.length === 0) {
                    return [2 /*return*/, []];
                }
                condition = {
                    id: typeorm_1.In(ids)
                };
                if (subjectId !== undefined) {
                    condition.subjectId = subjectId;
                }
                if (!includeDeleted) {
                    condition.isDeleted = false;
                }
                queryBuilder = entityManager.getRepository(this.AbcAccountRecordEx).createQueryBuilder()
                    .select()
                    .where(condition);
                Context_1.logSql(context.logger, queryBuilder.getQueryAndParameters());
                return [2 /*return*/, queryBuilder.getMany()];
            });
        });
    };
    AbcAccountRecordDAO.prototype.getRecordsByCondition = function (subjectId, dealerIds, name, code, mobile, recordAtLowerBound, recordAtUpperBound, timezone, entityManager, context) {
        return __awaiter(this, void 0, void 0, function () {
            var whereSQL, queryBuilder;
            return __generator(this, function (_a) {
                if (dealerIds && dealerIds.length === 0) {
                    return [2 /*return*/, []];
                }
                whereSQL = " isDeleted = 0 ";
                if (subjectId !== undefined) {
                    whereSQL = whereSQL.concat(" AND subjectId = " + subjectId);
                }
                if (dealerIds) {
                    whereSQL = whereSQL.concat(" AND dealerId in (" + dealerIds.map(function (m) { return "'" + m + "'"; }).join(',') + ") ");
                }
                if (name !== undefined) {
                    whereSQL = whereSQL.concat(" AND name = '" + name + "'");
                }
                if (code !== undefined) {
                    whereSQL = whereSQL.concat(" AND code = '" + code + "'");
                }
                if (mobile !== undefined) {
                    whereSQL = whereSQL.concat(" AND mobile = '" + mobile + "'");
                }
                if (recordAtLowerBound) {
                    whereSQL = whereSQL.concat(" AND createdAt >= '" + common_utils_1.toDBDateString(new Date(recordAtLowerBound), timezone) + "' ");
                }
                if (recordAtUpperBound) {
                    whereSQL = whereSQL.concat(" AND createdAt <'" + common_utils_1.toDBDateString(new Date(recordAtUpperBound), timezone) + "' ");
                }
                queryBuilder = entityManager.getRepository(this.AbcAccountRecordEx).createQueryBuilder()
                    .select()
                    .where(whereSQL);
                Context_1.logSql(context.logger, queryBuilder.getQueryAndParameters());
                return [2 /*return*/, queryBuilder.getMany()];
            });
        });
    };
    AbcAccountRecordDAO.prototype.createAccountRecord = function (subjectId, dealerId, name, code, mobile, detailJson, creator, entityManager, context) {
        return __awaiter(this, void 0, void 0, function () {
            var systemTime, record, queryBuilder, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        systemTime = new Date();
                        record = new entity_1.AbcAccountRecord();
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
                        queryBuilder = entityManager.getRepository(this.AbcAccountRecordEx).createQueryBuilder()
                            .insert()
                            .values(record);
                        Context_1.logSql(context.logger, queryBuilder.getQueryAndParameters());
                        return [4 /*yield*/, queryBuilder.execute()];
                    case 1:
                        result = _a.sent();
                        record.id = result.identifiers[0].id;
                        return [2 /*return*/, record];
                }
            });
        });
    };
    AbcAccountRecordDAO.prototype.updateAccountRecordById = function (subjectId, id, dealerId, name, code, mobile, detailJson, updater, entityManager, context) {
        return __awaiter(this, void 0, void 0, function () {
            var condition, toUpdate, queryBuilder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(name !== undefined || dealerId !== undefined || code !== undefined || mobile !== undefined || detailJson !== undefined)) {
                            return [2 /*return*/];
                        }
                        condition = {
                            id: id,
                            isDeleted: false
                        };
                        if (subjectId !== undefined) {
                            condition.subjectId = subjectId;
                        }
                        toUpdate = {
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
                        queryBuilder = entityManager.getRepository(this.AbcAccountRecordEx).createQueryBuilder()
                            .update()
                            .set(toUpdate)
                            .where(condition);
                        Context_1.logSql(context.logger, queryBuilder.getQueryAndParameters());
                        return [4 /*yield*/, queryBuilder.execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AbcAccountRecordDAO.prototype.deleteRecordsByIds = function (subjectId, ids, deleter, entityManager, context) {
        return __awaiter(this, void 0, void 0, function () {
            var condition, queryBuilder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (ids && ids.length === 0) {
                            return [2 /*return*/];
                        }
                        condition = {
                            isDeleted: false
                        };
                        if (subjectId !== undefined) {
                            condition.subjectId = subjectId;
                        }
                        if (ids !== undefined) {
                            condition.id = typeorm_1.In(ids);
                        }
                        queryBuilder = entityManager.getRepository(this.AbcAccountRecordEx).createQueryBuilder()
                            .update()
                            .set({
                            updatedBy: deleter,
                            updatedAt: new Date(),
                            isDeleted: true
                        })
                            .where(condition);
                        Context_1.logSql(context.logger, queryBuilder.getQueryAndParameters());
                        return [4 /*yield*/, queryBuilder.execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return AbcAccountRecordDAO;
}());
exports.AbcAccountRecordDAO = AbcAccountRecordDAO;
