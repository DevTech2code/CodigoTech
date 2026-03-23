import { PrismaService } from '../prisma/prisma.service';
import { CreateNetworkAdapterDto } from './dto/create-network-adapter.dto';
import { UpdateNetworkAdapterDto } from './dto/update-network-adapter.dto';
export declare class NetworkAdapterService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateNetworkAdapterDto): Promise<{
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
        speed: string | null;
    }>;
    update(id: number, dto: UpdateNetworkAdapterDto): Promise<{
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
        speed: string | null;
    }>;
}
