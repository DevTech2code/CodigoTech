import { SimPlanType, SimStatus } from '@prisma/client';
export declare class CreateSimCardDto {
    assetId: number;
    carrier: string;
    phoneNumber: string;
    planType: SimPlanType;
    status?: SimStatus;
    activationDate?: Date;
    notes?: string;
}
