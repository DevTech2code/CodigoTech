import { PrismaService } from '../prisma/prisma.service';
import { CreateRj45ConnectorDto } from './dto/create-rj45-connector.dto';
import { UpdateRj45ConnectorDto } from './dto/update-rj45-connector.dto';
export declare class Rj45ConnectorService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateRj45ConnectorDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        model: string;
        purchasePrice: number | null;
        purchaseDate: Date | null;
        notes: string | null;
        type: string | null;
        usageDate: Date | null;
        material: string | null;
        quantityUnits: number;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        model: string;
        purchasePrice: number | null;
        purchaseDate: Date | null;
        notes: string | null;
        type: string | null;
        usageDate: Date | null;
        material: string | null;
        quantityUnits: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        model: string;
        purchasePrice: number | null;
        purchaseDate: Date | null;
        notes: string | null;
        type: string | null;
        usageDate: Date | null;
        material: string | null;
        quantityUnits: number;
    }>;
    update(id: number, data: UpdateRj45ConnectorDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        model: string;
        purchasePrice: number | null;
        purchaseDate: Date | null;
        notes: string | null;
        type: string | null;
        usageDate: Date | null;
        material: string | null;
        quantityUnits: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        model: string;
        purchasePrice: number | null;
        purchaseDate: Date | null;
        notes: string | null;
        type: string | null;
        usageDate: Date | null;
        material: string | null;
        quantityUnits: number;
    }>;
}
