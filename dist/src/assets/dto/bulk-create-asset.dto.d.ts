import { AssetStatus } from './create-asset.dto';
export declare class BulkCreateAssetItemDto {
    assetCode: string;
    assetType: string;
    serialNumber?: string;
    brand?: string;
    model?: string;
    purchasePrice?: number;
    status?: AssetStatus;
    branchId?: number;
    purchaseDate?: string;
    deliveryDate?: string;
    receivedDate?: string;
    notes?: string;
    attributesJson?: Record<string, string | number | boolean>;
}
export declare class BulkCreateAssetDto {
    quantity: number;
    template: BulkCreateAssetItemDto;
}
