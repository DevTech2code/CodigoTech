import { UtpCableService } from './utp-cable.service';
import { CreateUtpCableDto } from './dto/create-utp-cable.dto';
import { UpdateUtpCableDto } from './dto/update-utp-cable.dto';
export declare class UtpCableController {
    private readonly utpCableService;
    constructor(utpCableService: UtpCableService);
    create(dto: CreateUtpCableDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        purchasePrice: number | null;
        purchaseDate: Date | null;
        notes: string | null;
        type: string;
        color: string | null;
        usageDate: Date | null;
        material: string | null;
        lengthMeters: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        purchasePrice: number | null;
        purchaseDate: Date | null;
        notes: string | null;
        type: string;
        color: string | null;
        usageDate: Date | null;
        material: string | null;
        lengthMeters: import("@prisma/client/runtime/library").Decimal | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        purchasePrice: number | null;
        purchaseDate: Date | null;
        notes: string | null;
        type: string;
        color: string | null;
        usageDate: Date | null;
        material: string | null;
        lengthMeters: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    update(id: number, dto: UpdateUtpCableDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        purchasePrice: number | null;
        purchaseDate: Date | null;
        notes: string | null;
        type: string;
        color: string | null;
        usageDate: Date | null;
        material: string | null;
        lengthMeters: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        purchasePrice: number | null;
        purchaseDate: Date | null;
        notes: string | null;
        type: string;
        color: string | null;
        usageDate: Date | null;
        material: string | null;
        lengthMeters: import("@prisma/client/runtime/library").Decimal | null;
    }>;
}
