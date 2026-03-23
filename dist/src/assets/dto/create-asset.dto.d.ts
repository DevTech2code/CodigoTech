export declare enum AssetStatus {
    available = "available",
    assigned = "assigned",
    maintenance = "maintenance",
    decommissioned = "decommissioned"
}
export declare class CreateAssetDto {
    assetCode: string;
    assetType: string;
    serialNumber?: string;
    brand?: string;
    model?: string;
    purchasePrice?: number;
    status?: AssetStatus;
    branchId?: number;
    assignedPersonId?: number;
    purchaseDate?: string;
    deliveryDate?: string;
    receivedDate?: string;
    notes?: string;
    attributesJson?: Record<string, any>;
}
