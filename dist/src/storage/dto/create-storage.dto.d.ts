import { StorageType } from '@prisma/client';
export declare class CreateStorageDto {
    assetId: number;
    type: StorageType;
    capacityGb: number;
    notes?: string;
}
