import { Request } from 'express';
import { PeopleService } from '../people.service';
export declare class UserPeopleController {
    private readonly peopleService;
    constructor(peopleService: PeopleService);
    getCurrentUser(req: Request): Promise<{
        role: {
            id: number;
            name: string;
            description: string | null;
        } | null;
        department: {
            id: number;
            name: string;
            description: string | null;
        } | null;
        assets: {
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
        }[];
        branch: {
            id: number;
            name: string;
            address: string | null;
            region: string | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nationalId: string;
        username: string | null;
        firstName: string;
        lastName: string;
        password: string | null;
        status: import("@prisma/client").$Enums.PersonStatus;
        departmentId: number | null;
        roleId: number | null;
        branchId: number | null;
        currentToken: string | null;
        lastActivityAt: Date | null;
        mustChangePassword: boolean;
        observation: string | null;
        tiAssetIds: number[];
    }>;
}
