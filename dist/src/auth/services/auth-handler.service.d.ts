import { AuthService } from '../auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from '../dto/login.dto';
import { Response, Request } from 'express';
export declare class AuthHandlerService {
    private readonly authService;
    private readonly prisma;
    constructor(authService: AuthService, prisma: PrismaService);
    handleLogin(loginDto: LoginDto, res: Response): Promise<{
        message: string;
        user: {
            id: any;
            username: any;
            role: any;
        };
        access_token: string;
    }>;
    handleLogout(req: Request, res: Response): Promise<{
        message: string;
    }>;
    handleMe(req: Request, res: Response): Promise<{
        id: number;
        role: {
            id: number;
            name: string;
        } | null;
        nationalId: string;
        username: string | null;
        firstName: string;
        lastName: string;
        status: import("@prisma/client").$Enums.PersonStatus;
        departmentId: number | null;
        roleId: number | null;
        branchId: number | null;
    }>;
}
