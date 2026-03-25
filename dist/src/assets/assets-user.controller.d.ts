import { AssetsService } from './assets.service';
export declare class AssetsUserController {
    private readonly assetsService;
    constructor(assetsService: AssetsService);
    getUserAssets(req: any): Promise<{
        id: number;
        status: import("@prisma/client").$Enums.AssetStatus;
        assetCode: string;
        serialNumber: string | null;
        assetType: string;
        brand: string | null;
        model: string | null;
        purchaseDate: Date | null;
    }[]>;
    getAssetTypes(): Promise<string[]>;
}
