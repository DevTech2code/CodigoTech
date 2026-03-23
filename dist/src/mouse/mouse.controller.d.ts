import { MouseService } from './mouse.service';
import { CreateMouseDto } from './dto/create-mouse.dto';
import { UpdateMouseDto } from './dto/update-mouse.dto';
export declare class MouseController {
    private readonly mouseService;
    constructor(mouseService: MouseService);
    create(createMouseDto: CreateMouseDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        model: string;
        purchaseDate: Date | null;
        notes: string | null;
        color: string | null;
        usageDate: Date | null;
        connectionType: string | null;
        dpi: number | null;
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
        connectionType: string | null;
        dpi: number | null;
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
        connectionType: string | null;
        dpi: number | null;
    }>;
    update(id: number, updateMouseDto: UpdateMouseDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        model: string;
        purchaseDate: Date | null;
        notes: string | null;
        color: string | null;
        usageDate: Date | null;
        connectionType: string | null;
        dpi: number | null;
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
        connectionType: string | null;
        dpi: number | null;
    }>;
}
