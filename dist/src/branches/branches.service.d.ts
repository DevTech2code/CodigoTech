import { PrismaService } from '../prisma/prisma.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
export declare class BranchesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateBranchDto): Promise<{
        id: number;
        name: string;
        address: string | null;
        region: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        address: string | null;
        region: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        address: string | null;
        region: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, data: UpdateBranchDto): Promise<{
        id: number;
        name: string;
        address: string | null;
        region: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        address: string | null;
        region: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
