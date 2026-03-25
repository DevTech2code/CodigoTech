import { PrismaService } from '../prisma/prisma.service';
import { CreateMousePadDto } from './dto/create-mouse-pad.dto';
import { UpdateMousePadDto } from './dto/update-mouse-pad.dto';
export declare class MousePadService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateMousePadDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string | null;
        model: string | null;
        purchaseDate: Date | null;
        notes: string | null;
        color: string | null;
        usageDate: Date | null;
        material: string | null;
        size: string | null;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string | null;
        model: string | null;
        purchaseDate: Date | null;
        notes: string | null;
        color: string | null;
        usageDate: Date | null;
        material: string | null;
        size: string | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string | null;
        model: string | null;
        purchaseDate: Date | null;
        notes: string | null;
        color: string | null;
        usageDate: Date | null;
        material: string | null;
        size: string | null;
    }>;
    update(id: number, dto: UpdateMousePadDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string | null;
        model: string | null;
        purchaseDate: Date | null;
        notes: string | null;
        color: string | null;
        usageDate: Date | null;
        material: string | null;
        size: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string | null;
        model: string | null;
        purchaseDate: Date | null;
        notes: string | null;
        color: string | null;
        usageDate: Date | null;
        material: string | null;
        size: string | null;
    }>;
}
