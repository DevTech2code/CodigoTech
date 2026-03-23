import { SimCardsService } from './sim-cards.service';
import { CreateSimCardDto } from './dto/create-sim-card.dto';
import { UpdateSimCardDto } from './dto/update-sim-card.dto';
export declare class SimCardsController {
    private readonly service;
    constructor(service: SimCardsService);
    create(dto: CreateSimCardDto): Promise<{
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
    update(id: number, dto: UpdateSimCardDto): Promise<{
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
    remove(id: number): void;
}
