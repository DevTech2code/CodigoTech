import { RequestsService } from './requests.service';
import { RequestType } from '@prisma/client';
export declare class RequestsController {
    private readonly service;
    constructor(service: RequestsService);
    create(req: any, body: {
        type: RequestType;
        payload?: any;
    }): Promise<{
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
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        hrReason: string | null;
        adminReason: string | null;
        hrReviewerId: number | null;
        adminReviewerId: number | null;
        hrSeenAt: Date | null;
    }>;
    list(req: any, status?: string): Promise<({
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
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        hrReason: string | null;
        adminReason: string | null;
        hrReviewerId: number | null;
        adminReviewerId: number | null;
        hrSeenAt: Date | null;
    })[]>;
    getOne(id: number): Promise<{
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
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        hrReason: string | null;
        adminReason: string | null;
        hrReviewerId: number | null;
        adminReviewerId: number | null;
        hrSeenAt: Date | null;
    }>;
    seenByHr(id: number, req: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.RequestStatus;
        personId: number;
        type: import("@prisma/client").$Enums.RequestType;
        code: string;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        hrReason: string | null;
        adminReason: string | null;
        hrReviewerId: number | null;
        adminReviewerId: number | null;
        hrSeenAt: Date | null;
    }>;
    acceptByHr(id: number, req: any, body: {
        reason?: string;
    }): Promise<{
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
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        hrReason: string | null;
        adminReason: string | null;
        hrReviewerId: number | null;
        adminReviewerId: number | null;
        hrSeenAt: Date | null;
    }>;
    rejectByHr(id: number, req: any, body: {
        reason: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.RequestStatus;
        personId: number;
        type: import("@prisma/client").$Enums.RequestType;
        code: string;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        hrReason: string | null;
        adminReason: string | null;
        hrReviewerId: number | null;
        adminReviewerId: number | null;
        hrSeenAt: Date | null;
    }>;
    acceptByAdmin(id: number, req: any, body: {
        reason?: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.RequestStatus;
        personId: number;
        type: import("@prisma/client").$Enums.RequestType;
        code: string;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        hrReason: string | null;
        adminReason: string | null;
        hrReviewerId: number | null;
        adminReviewerId: number | null;
        hrSeenAt: Date | null;
    }>;
    rejectByAdmin(id: number, req: any, body: {
        reason: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.RequestStatus;
        personId: number;
        type: import("@prisma/client").$Enums.RequestType;
        code: string;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        hrReason: string | null;
        adminReason: string | null;
        hrReviewerId: number | null;
        adminReviewerId: number | null;
        hrSeenAt: Date | null;
    }>;
}
