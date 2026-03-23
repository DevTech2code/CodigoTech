import { PrismaService } from '../prisma/prisma.service';
import { CreateInkDto } from './dto/create-ink.dto';
import { UpdateInkDto } from './dto/update-ink.dto';
export declare class InkService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateInkDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        model: string;
        purchasePrice: number | null;
        purchaseDate: Date | null;
        notes: string | null;
        quantity: number;
        color: string;
        inkType: string | null;
        usageDate: Date | null;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        model: string;
        purchasePrice: number | null;
        purchaseDate: Date | null;
        notes: string | null;
        quantity: number;
        color: string;
        inkType: string | null;
        usageDate: Date | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        model: string;
        purchasePrice: number | null;
        purchaseDate: Date | null;
        notes: string | null;
        quantity: number;
        color: string;
        inkType: string | null;
        usageDate: Date | null;
    }>;
    update(id: number, dto: UpdateInkDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        model: string;
        purchasePrice: number | null;
        purchaseDate: Date | null;
        notes: string | null;
        quantity: number;
        color: string;
        inkType: string | null;
        usageDate: Date | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        model: string;
        purchasePrice: number | null;
        purchaseDate: Date | null;
        notes: string | null;
        quantity: number;
        color: string;
        inkType: string | null;
        usageDate: Date | null;
    }>;
}
