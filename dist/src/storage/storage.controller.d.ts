import { StorageService } from './storage.service';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
export declare class StorageController {
    private readonly storageService;
    constructor(storageService: StorageService);
    create(dto: CreateStorageDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        assetId: number;
        type: import("@prisma/client").$Enums.StorageType;
        capacityGb: number;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        assetId: number;
        type: import("@prisma/client").$Enums.StorageType;
        capacityGb: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        assetId: number;
        type: import("@prisma/client").$Enums.StorageType;
        capacityGb: number;
    }>;
    update(id: number, dto: UpdateStorageDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        assetId: number;
        type: import("@prisma/client").$Enums.StorageType;
        capacityGb: number;
    }>;
    remove(id: number): Promise<void>;
}
