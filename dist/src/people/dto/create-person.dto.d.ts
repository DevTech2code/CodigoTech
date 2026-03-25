export declare enum PersonStatus {
    active = "active",
    inactive = "inactive",
    suspended = "suspended"
}
export declare class CreatePersonDto {
    nationalId: string;
    firstName: string;
    lastName: string;
    username?: string;
    password: string;
    status?: PersonStatus;
    departmentId?: number;
    roleId?: number;
    branchId?: number;
    observation?: string;
    tiAssetIds?: number[];
}
