import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { BulkCreateAssetDto } from './dto/bulk-create-asset.dto';
export declare class AssetsController {
    private readonly assetsService;
    constructor(assetsService: AssetsService);
    create(req: any, dto: CreateAssetDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.AssetStatus;
        branchId: number | null;
        assetCode: string;
        serialNumber: string | null;
        assetType: string;
        brand: string | null;
        model: string | null;
        purchasePrice: number | null;
        assignedPersonId: number | null;
        purchaseDate: Date | null;
        deliveryDate: Date | null;
        receivedDate: Date | null;
        notes: string | null;
        attributesJson: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    createBulk(req: any, dto: BulkCreateAssetDto): Promise<{
        created: number;
        quantity: number;
        message: string;
    }>;
    findAll(q?: string, page?: string, limit?: string): Promise<{
        data: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            branch: {
                id: number;
                name: string;
            } | null;
            status: import("@prisma/client").$Enums.AssetStatus;
            branchId: number | null;
            assetCode: string;
            serialNumber: string | null;
            assetType: string;
            brand: string | null;
            model: string | null;
            assignedPersonId: number | null;
            purchaseDate: Date | null;
            deliveryDate: Date | null;
            receivedDate: Date | null;
            notes: string | null;
            attributesJson: import("@prisma/client/runtime/library").JsonValue;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findAllPublic(q?: string, page?: string, limit?: string): Promise<{
        data: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            branch: {
                id: number;
                name: string;
            } | null;
            status: import("@prisma/client").$Enums.AssetStatus;
            branchId: number | null;
            assetCode: string;
            serialNumber: string | null;
            assetType: string;
            brand: string | null;
            model: string | null;
            assignedPersonId: number | null;
            purchaseDate: Date | null;
            deliveryDate: Date | null;
            receivedDate: Date | null;
            notes: string | null;
            attributesJson: import("@prisma/client/runtime/library").JsonValue;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.AssetStatus;
        branchId: number | null;
        assetCode: string;
        serialNumber: string | null;
        assetType: string;
        brand: string | null;
        model: string | null;
        purchasePrice: number | null;
        assignedPersonId: number | null;
        purchaseDate: Date | null;
        deliveryDate: Date | null;
        receivedDate: Date | null;
        notes: string | null;
        attributesJson: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    update(id: number, dto: UpdateAssetDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.AssetStatus;
        branchId: number | null;
        assetCode: string;
        serialNumber: string | null;
        assetType: string;
        brand: string | null;
        model: string | null;
        purchasePrice: number | null;
        assignedPersonId: number | null;
        purchaseDate: Date | null;
        deliveryDate: Date | null;
        receivedDate: Date | null;
        notes: string | null;
        attributesJson: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.AssetStatus;
        branchId: number | null;
        assetCode: string;
        serialNumber: string | null;
        assetType: string;
        brand: string | null;
        model: string | null;
        purchasePrice: number | null;
        assignedPersonId: number | null;
        purchaseDate: Date | null;
        deliveryDate: Date | null;
        receivedDate: Date | null;
        notes: string | null;
        attributesJson: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    getAssetsGroupedByPerson(): Promise<{
        person: {
            id: number;
            name: string;
            username: string | null;
        };
        assets: {
            id: number;
            status: import("@prisma/client").$Enums.AssetStatus;
            assetCode: string;
            serialNumber: string | null;
            assetType: string;
            brand: string | null;
            model: string | null;
            purchaseDate: Date | null;
            deliveryDate: Date | null;
            receivedDate: Date | null;
        }[];
        count: number;
    }[]>;
}
