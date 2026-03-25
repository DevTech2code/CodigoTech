import { Condition } from '@prisma/client';
export declare class CreateLoanDto {
    assetId: number;
    personId: number;
    branchId?: number;
    loanDays: number;
    loanDate?: Date;
    deliveryCondition?: Condition;
    deliveryNotes?: string;
}
