import { PrismaService } from '../prisma/prisma.service';
import { Prisma, RequestStatus, RequestType } from '@prisma/client';
import { EmailService } from '../common/services/email.service';
interface CreateRequestDto {
    type: RequestType;
    code?: string;
    payload?: any;
}
export declare class RequestsService {
    private prisma;
    private emailService;
    constructor(prisma: PrismaService, emailService: EmailService);
    create(personId: number, dto: CreateRequestDto, userRole?: string): Promise<{
        person: {
            firstName: string;
            lastName: string;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.RequestStatus;
        personId: number;
        type: import("@prisma/client").$Enums.RequestType;
        code: string;
        payload: Prisma.JsonValue | null;
        hrReason: string | null;
        adminReason: string | null;
        hrReviewerId: number | null;
        adminReviewerId: number | null;
        hrSeenAt: Date | null;
    }>;
    findAllForRole(user: any, status?: RequestStatus | undefined): Promise<({
        hrReviewer: {
            firstName: string;
            lastName: string;
        } | null;
        adminReviewer: {
            firstName: string;
            lastName: string;
        } | null;
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.RequestStatus;
        personId: number;
        type: import("@prisma/client").$Enums.RequestType;
        code: string;
        payload: Prisma.JsonValue | null;
        hrReason: string | null;
        adminReason: string | null;
        hrReviewerId: number | null;
        adminReviewerId: number | null;
        hrSeenAt: Date | null;
    })[]>;
    findOne(id: number): Promise<{
        hrReviewer: {
            firstName: string;
            lastName: string;
        } | null;
        adminReviewer: {
            firstName: string;
            lastName: string;
        } | null;
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.RequestStatus;
        personId: number;
        type: import("@prisma/client").$Enums.RequestType;
        code: string;
        payload: Prisma.JsonValue | null;
        hrReason: string | null;
        adminReason: string | null;
        hrReviewerId: number | null;
        adminReviewerId: number | null;
        hrSeenAt: Date | null;
    }>;
    markSeenByHr(id: number, reviewerId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.RequestStatus;
        personId: number;
        type: import("@prisma/client").$Enums.RequestType;
        code: string;
        payload: Prisma.JsonValue | null;
        hrReason: string | null;
        adminReason: string | null;
        hrReviewerId: number | null;
        adminReviewerId: number | null;
        hrSeenAt: Date | null;
    }>;
    acceptByHr(id: number, reviewerId: number, hrReason?: string): Promise<{
        person: {
            firstName: string;
            lastName: string;
        };
        hrReviewer: {
            firstName: string;
            lastName: string;
        } | null;
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.RequestStatus;
        personId: number;
        type: import("@prisma/client").$Enums.RequestType;
        code: string;
        payload: Prisma.JsonValue | null;
        hrReason: string | null;
        adminReason: string | null;
        hrReviewerId: number | null;
        adminReviewerId: number | null;
        hrSeenAt: Date | null;
    }>;
    rejectByHr(id: number, reviewerId: number, reason: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.RequestStatus;
        personId: number;
        type: import("@prisma/client").$Enums.RequestType;
        code: string;
        payload: Prisma.JsonValue | null;
        hrReason: string | null;
        adminReason: string | null;
        hrReviewerId: number | null;
        adminReviewerId: number | null;
        hrSeenAt: Date | null;
    }>;
    acceptByAdmin(id: number, reviewerId: number, adminReason?: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.RequestStatus;
        personId: number;
        type: import("@prisma/client").$Enums.RequestType;
        code: string;
        payload: Prisma.JsonValue | null;
        hrReason: string | null;
        adminReason: string | null;
        hrReviewerId: number | null;
        adminReviewerId: number | null;
        hrSeenAt: Date | null;
    }>;
    rejectByAdmin(id: number, reviewerId: number, reason: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.RequestStatus;
        personId: number;
        type: import("@prisma/client").$Enums.RequestType;
        code: string;
        payload: Prisma.JsonValue | null;
        hrReason: string | null;
        adminReason: string | null;
        hrReviewerId: number | null;
        adminReviewerId: number | null;
        hrSeenAt: Date | null;
    }>;
    private generateCode;
}
export {};
