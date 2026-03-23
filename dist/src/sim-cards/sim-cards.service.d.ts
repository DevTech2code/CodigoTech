import { PrismaService } from '../prisma/prisma.service';
import { CreateSimCardDto } from './dto/create-sim-card.dto';
import { UpdateSimCardDto } from './dto/update-sim-card.dto';
export declare class SimCardsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateSimCardDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.SimStatus;
        notes: string | null;
        assetId: number;
        carrier: string;
        phoneNumber: string;
        planType: import("@prisma/client").$Enums.SimPlanType;
        activationDate: Date | null;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.SimStatus;
        notes: string | null;
        assetId: number;
        carrier: string;
        phoneNumber: string;
        planType: import("@prisma/client").$Enums.SimPlanType;
        activationDate: Date | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.SimStatus;
        notes: string | null;
        assetId: number;
        carrier: string;
        phoneNumber: string;
        planType: import("@prisma/client").$Enums.SimPlanType;
        activationDate: Date | null;
    }>;
    update(id: number, data: UpdateSimCardDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.SimStatus;
        notes: string | null;
        assetId: number;
        carrier: string;
        phoneNumber: string;
        planType: import("@prisma/client").$Enums.SimPlanType;
        activationDate: Date | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.SimStatus;
        notes: string | null;
        assetId: number;
        carrier: string;
        phoneNumber: string;
        planType: import("@prisma/client").$Enums.SimPlanType;
        activationDate: Date | null;
    }>;
}
