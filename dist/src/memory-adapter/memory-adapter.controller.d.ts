import { MemoryAdapterService } from './memory-adapter.service';
import { CreateMemoryAdapterDto } from './dto/create-memory-adapter.dto';
import { UpdateMemoryAdapterDto } from './dto/update-memory-adapter.dto';
export declare class MemoryAdapterController {
    private readonly service;
    constructor(service: MemoryAdapterService);
    create(dto: CreateMemoryAdapterDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        model: string;
        purchaseDate: Date | null;
        notes: string | null;
        color: string | null;
        usageDate: Date | null;
        adapterType: string | null;
        compatibility: string | null;
        speed: string | null;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        model: string;
        purchaseDate: Date | null;
        notes: string | null;
        color: string | null;
        usageDate: Date | null;
        adapterType: string | null;
        compatibility: string | null;
        speed: string | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        model: string;
        purchaseDate: Date | null;
        notes: string | null;
        color: string | null;
        usageDate: Date | null;
        adapterType: string | null;
        compatibility: string | null;
        speed: string | null;
    }>;
    update(id: number, dto: UpdateMemoryAdapterDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        model: string;
        purchaseDate: Date | null;
        notes: string | null;
        color: string | null;
        usageDate: Date | null;
        adapterType: string | null;
        compatibility: string | null;
        speed: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        model: string;
        purchaseDate: Date | null;
        notes: string | null;
        color: string | null;
        usageDate: Date | null;
        adapterType: string | null;
        compatibility: string | null;
        speed: string | null;
    }>;
}
