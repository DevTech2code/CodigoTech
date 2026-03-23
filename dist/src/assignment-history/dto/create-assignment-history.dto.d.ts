import { Condition, ActaStatus } from '@prisma/client';
export declare class CreateAssignmentHistoryDto {
    assetId: number;
    personId: number;
    branchId?: number;
    assignmentDate?: Date;
    returnDate?: Date;
    deliveryCondition?: Condition;
    returnCondition?: Condition;
    deliveryNotes?: string;
    returnNotes?: string;
    actaStatus?: ActaStatus;
    actaFirmadaAt?: Date;
    actaRecepcionStatus?: ActaStatus;
    actaRecepcionFirmadaAt?: Date;
}
