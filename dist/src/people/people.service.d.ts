import { PrismaService } from '../prisma/prisma.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Prisma } from '@prisma/client';
export declare class PeopleService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreatePersonDto): Promise<{
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
    findAll(q?: string, page?: number, limit?: number): Promise<{
        data: ({
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
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: number): Promise<{
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
    update(id: number, data: UpdatePersonDto): Promise<{
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
    remove(id: number): Promise<{
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
    findUserDetails(id: number): Promise<({
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
            attributesJson: Prisma.JsonValue | null;
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
    }) | null>;
    private handlePrismaError;
}
