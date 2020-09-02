import { PrimaryGeneratedColumn, Column} from "typeorm";

export enum AbcPayStatus {
    UNPAID,
    PAID,
    FAILURE,
    FULL_REFUND,
    PART_REFUND,
    OVERDUE
}

export class AbcOrderRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    subjectId: number;

    @Column()
    orderId: number;

    @Column()
    orderCode: string;

    @Column()
    transactionNo: string

    @Column()
    abcTranNo: string;

    @Column()
    abcMeta: string;

    @Column()
    payStatus: AbcPayStatus;

    @Column()
    company: number;

    @Column()
    supplierId: number;

    @Column()
    amount: number;

    @Column()
    createdAt: Date;

    @Column()
    createdBy: number;

    @Column()
    updatedAt: Date;

    @Column()
    updatedBy: number;

    @Column()
    isDeleted: boolean;

    @Column()
    comment: string;
}
