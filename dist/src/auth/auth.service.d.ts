import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePersonDto } from '../people/dto/create-person.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    register(dto: CreatePersonDto): Promise<{
        message: string;
        user: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            nationalId: string;
            username: string | null;
            firstName: string;
            lastName: string;
            status: import("@prisma/client").$Enums.PersonStatus;
            departmentId: number | null;
            roleId: number | null;
            branchId: number | null;
            currentToken: string | null;
            lastActivityAt: Date | null;
            mustChangePassword: boolean;
            observation: string | null;
            tiAssetIds: number[];
        };
    }>;
    validateUser(username: string, password: string): Promise<{
        role: {
            id: number;
            name: string;
            description: string | null;
        } | null;
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nationalId: string;
        username: string | null;
        firstName: string;
        lastName: string;
        password: string | null;
        status: import("@prisma/client").$Enums.PersonStatus;
        departmentId: number | null;
        roleId: number | null;
        branchId: number | null;
        currentToken: string | null;
        lastActivityAt: Date | null;
        mustChangePassword: boolean;
        observation: string | null;
        tiAssetIds: number[];
    }>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            username: any;
            role: any;
        };
    }>;
    logout(userId: number): any;
    changePassword(userId: number, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    forceChangePassword(userId: number, newPassword: string): Promise<{
        message: string;
    }>;
    resetPasswordToUsername(userId: number): Promise<{
        message: string;
    }>;
    private hash;
    private compare;
    private findUserOrThrow;
    private updatePassword;
}
