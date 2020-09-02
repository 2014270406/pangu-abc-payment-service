var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { PrimaryGeneratedColumn, Column } from "typeorm";
export var AbcPayStatus;
(function (AbcPayStatus) {
    AbcPayStatus[AbcPayStatus["UNPAID"] = 0] = "UNPAID";
    AbcPayStatus[AbcPayStatus["PAID"] = 1] = "PAID";
    AbcPayStatus[AbcPayStatus["FAILURE"] = 2] = "FAILURE";
    AbcPayStatus[AbcPayStatus["FULL_REFUND"] = 3] = "FULL_REFUND";
    AbcPayStatus[AbcPayStatus["PART_REFUND"] = 4] = "PART_REFUND";
    AbcPayStatus[AbcPayStatus["OVERDUE"] = 5] = "OVERDUE";
})(AbcPayStatus || (AbcPayStatus = {}));
export class AbcOrderRecord {
}
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AbcOrderRecord.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], AbcOrderRecord.prototype, "subjectId", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], AbcOrderRecord.prototype, "orderId", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], AbcOrderRecord.prototype, "orderCode", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], AbcOrderRecord.prototype, "transactionNo", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], AbcOrderRecord.prototype, "abcTranNo", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], AbcOrderRecord.prototype, "abcMeta", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], AbcOrderRecord.prototype, "payStatus", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], AbcOrderRecord.prototype, "company", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], AbcOrderRecord.prototype, "supplierId", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], AbcOrderRecord.prototype, "amount", void 0);
__decorate([
    Column(),
    __metadata("design:type", Date)
], AbcOrderRecord.prototype, "createdAt", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], AbcOrderRecord.prototype, "createdBy", void 0);
__decorate([
    Column(),
    __metadata("design:type", Date)
], AbcOrderRecord.prototype, "updatedAt", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], AbcOrderRecord.prototype, "updatedBy", void 0);
__decorate([
    Column(),
    __metadata("design:type", Boolean)
], AbcOrderRecord.prototype, "isDeleted", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], AbcOrderRecord.prototype, "comment", void 0);
