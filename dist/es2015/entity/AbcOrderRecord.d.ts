export declare enum AbcPayStatus {
    UNPAID = 0,
    PAID = 1,
    FAILURE = 2,
    FULL_REFUND = 3,
    PART_REFUND = 4,
    OVERDUE = 5
}
export declare class AbcOrderRecord {
    id: number;
    subjectId: number;
    orderId: number;
    orderCode: string;
    transactionNo: string;
    abcTranNo: string;
    abcMeta: string;
    payStatus: AbcPayStatus;
    company: number;
    supplierId: number;
    amount: number;
    createdAt: Date;
    createdBy: number;
    updatedAt: Date;
    updatedBy: number;
    isDeleted: boolean;
    comment: string;
}
