import { Condition } from '@prisma/client';
export declare class UpdateLoanDto {
    returnDate?: Date;
    returnCondition?: Condition;
    returnNotes?: string;
    personId?: number;
    branchId?: number;
}
