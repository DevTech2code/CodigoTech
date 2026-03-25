import { PrismaService } from '../prisma/prisma.service';
import { CreateSupportDto } from './dto/create-support.dto';
import { UpdateSupportDto } from './dto/update-support.dto';
export declare class SupportService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateSupportDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string | null;
        model: string | null;
        purchaseDate: Date | null;
        notes: string | null;
        type: string | null;
        color: string | null;
        usageDate: Date | null;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string | null;
        model: string | null;
        purchaseDate: Date | null;
        notes: string | null;
        type: string | null;
        color: string | null;
        usageDate: Date | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string | null;
        model: string | null;
        purchaseDate: Date | null;
        notes: string | null;
        type: string | null;
        color: string | null;
        usageDate: Date | null;
    }>;
    update(id: number, dto: UpdateSupportDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string | null;
        model: string | null;
        purchaseDate: Date | null;
        notes: string | null;
        type: string | null;
        color: string | null;
        usageDate: Date | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string | null;
        model: string | null;
        purchaseDate: Date | null;
        notes: string | null;
        type: string | null;
        color: string | null;
        usageDate: Date | null;
    }>;
}
