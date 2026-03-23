import { SupportService } from './support.service';
import { CreateSupportDto } from './dto/create-support.dto';
import { UpdateSupportDto } from './dto/update-support.dto';
export declare class SupportController {
    private readonly supportService;
    constructor(supportService: SupportService);
    create(createSupportDto: CreateSupportDto): Promise<{
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
    update(id: number, updateSupportDto: UpdateSupportDto): Promise<{
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
