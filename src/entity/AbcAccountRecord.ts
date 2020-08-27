import { PrimaryGeneratedColumn, Column} from "typeorm";

export class AbcAccountRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    subjectId: number;

    @Column()
    dealerId: string;

    @Column()
    code: string;

    @Column()
    name: string;

    @Column()
    mobile: string;

    @Column()
    detailJson: string;

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
