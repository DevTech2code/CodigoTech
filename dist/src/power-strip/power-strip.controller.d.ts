import { PowerStripService } from './power-strip.service';
import { CreatePowerStripDto } from './dto/create-power-strip.dto';
import { UpdatePowerStripDto } from './dto/update-power-strip.dto';
export declare class PowerStripController {
    private readonly service;
    constructor(service: PowerStripService);
    create(createDto: CreatePowerStripDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string | null;
        model: string;
        purchasePrice: number | null;
        purchaseDate: Date | null;
        notes: string | null;
        color: string | null;
        usageDate: Date | null;
        lengthMeters: import("@prisma/client/runtime/library").Decimal | null;
        outletCount: number | null;
        capacity: number | null;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string | null;
        model: string;
        purchasePrice: number | null;
        purchaseDate: Date | null;
        notes: string | null;
        color: string | null;
        usageDate: Date | null;
        lengthMeters: import("@prisma/client/runtime/library").Decimal | null;
        outletCount: number | null;
        capacity: number | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string | null;
        model: string;
        purchasePrice: number | null;
        purchaseDate: Date | null;
        notes: string | null;
        color: string | null;
        usageDate: Date | null;
        lengthMeters: import("@prisma/client/runtime/library").Decimal | null;
        outletCount: number | null;
        capacity: number | null;
    }>;
    update(id: number, updateDto: UpdatePowerStripDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string | null;
        model: string;
        purchasePrice: number | null;
        purchaseDate: Date | null;
        notes: string | null;
        color: string | null;
        usageDate: Date | null;
        lengthMeters: import("@prisma/client/runtime/library").Decimal | null;
        outletCount: number | null;
        capacity: number | null;
    }>;
    remove(id: number): Promise<void>;
}
