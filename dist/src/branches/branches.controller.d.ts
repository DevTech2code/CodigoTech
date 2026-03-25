import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
export declare class BranchesController {
    private readonly branchesService;
    constructor(branchesService: BranchesService);
    create(dto: CreateBranchDto): Promise<{
        id: number;
        name: string;
        address: string | null;
        region: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        address: string | null;
        region: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        address: string | null;
        region: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, dto: UpdateBranchDto): Promise<{
        id: number;
        name: string;
        address: string | null;
        region: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<void>;
}
