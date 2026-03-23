import { Response, Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { AuthHandlerService } from './services/auth-handler.service';
import { PrismaService } from '../prisma/prisma.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthService } from './auth.service';
import { ForceChangePasswordDto } from './dto/force-change-password.dto';
export declare class AuthController {
    private readonly authHandler;
    private readonly authService;
    private readonly prisma;
    constructor(authHandler: AuthHandlerService, authService: AuthService, prisma: PrismaService);
    login(loginDto: LoginDto, res: Response): Promise<{
        message: string;
        user: {
            id: any;
            username: any;
            role: any;
        };
        access_token: string;
    }>;
    logout(req: Request, res: Response): Promise<{
        message: string;
    }>;
    me(req: Request, res: Response): Promise<{
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
    changePassword(req: Request, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    forceChangePassword(req: Request, dto: ForceChangePasswordDto): Promise<{
        message: string;
    }>;
    keepAlive(req: Request): Promise<{
        ok: boolean;
        timeoutMinutes?: undefined;
    } | {
        ok: boolean;
        timeoutMinutes: number;
    }>;
    session(req: Request): Promise<{
        remainingSeconds: number;
        lastActivityAt: Date | null | undefined;
        timeoutMinutes: number;
        tokenExp?: undefined;
    } | {
        remainingSeconds: number;
        timeoutMinutes: null;
        tokenExp: any;
        lastActivityAt?: undefined;
    } | {
        remainingSeconds: number;
        timeoutMinutes: number;
        lastActivityAt?: undefined;
        tokenExp?: undefined;
    }>;
}
