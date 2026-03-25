import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
export declare class CredentialsController {
    private readonly service;
    constructor(service: CredentialsService);
    create(dto: CreateCredentialDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        username: string;
        password: string;
        notes: string | null;
        personId: number;
        system: import("@prisma/client").$Enums.SystemType;
        phone: string | null;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        username: string;
        password: string;
        notes: string | null;
        personId: number;
        system: import("@prisma/client").$Enums.SystemType;
        phone: string | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        username: string;
        password: string;
        notes: string | null;
        personId: number;
        system: import("@prisma/client").$Enums.SystemType;
        phone: string | null;
    }>;
    update(id: number, dto: UpdateCredentialDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        username: string;
        password: string;
        notes: string | null;
        personId: number;
        system: import("@prisma/client").$Enums.SystemType;
        phone: string | null;
    }>;
    remove(id: number): Promise<void>;
}
