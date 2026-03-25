import { PeopleService } from '../people.service';
import { CreatePersonDto } from '../dto/create-person.dto';
import { UpdatePersonDto } from '../dto/update-person.dto';
export declare class AdminPeopleController {
    private readonly peopleService;
    constructor(peopleService: PeopleService);
    create(dto: CreatePersonDto): Promise<{
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
    findAll(q?: string, page?: string, limit?: string): Promise<{
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
    update(id: number, dto: UpdatePersonDto): Promise<{
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
    remove(id: number): Promise<void>;
}
