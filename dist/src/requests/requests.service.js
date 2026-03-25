"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const email_service_1 = require("../common/services/email.service");
let RequestsService = class RequestsService {
    constructor(prisma, emailService) {
        this.prisma = prisma;
        this.emailService = emailService;
    }
    async create(personId, dto, userRole) {
        const code = await this.generateCode();
        const existingPendingRequest = await this.prisma.request.findFirst({
            where: {
                personId,
                type: dto.type,
                status: {
                    in: [client_1.RequestStatus.pendiente_rrhh, client_1.RequestStatus.pendiente_admin],
                },
            },
        });
        if (existingPendingRequest) {
            throw new common_1.BadRequestException(`No se puede hacer mas de una solicitud por equipo`);
        }
        const isHR = userRole && (userRole.toLowerCase().includes('recursos humanos') || userRole.toLowerCase().includes('rrhh'));
        const initialStatus = isHR ? client_1.RequestStatus.pendiente_admin : client_1.RequestStatus.pendiente_rrhh;
        const request = await this.prisma.request.create({
            data: {
                code,
                personId,
                type: dto.type,
                status: initialStatus,
                payload: dto.payload ?? {},
                hrReviewerId: isHR ? personId : undefined,
            },
            include: {
                person: { select: { firstName: true, lastName: true } },
            },
        });
        try {
            const requesterFullName = `${request.person.firstName} ${request.person.lastName}`;
            await this.emailService.sendNewRequestNotificationToHR({ type: request.type, payload: request.payload }, requesterFullName, request.code);
        }
        catch (error) {
            console.error('❌ Error al enviar notificación de solicitud:', error.message);
        }
        return request;
    }
    async findAllForRole(user, status) {
        const where = {};
        if (status)
            where.status = status;
        const role = typeof user.role === 'string' ? user.role : user.role?.name;
        const roleL = (role || '').toLowerCase();
        if (!roleL || roleL === 'usuario') {
            where.personId = Number(user.personId ?? user.sub);
        }
        return this.prisma.request.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {
                hrReviewer: { select: { firstName: true, lastName: true } },
                adminReviewer: { select: { firstName: true, lastName: true } },
            },
        });
    }
    async findOne(id) {
        const req = await this.prisma.request.findUnique({
            where: { id },
            include: {
                hrReviewer: { select: { firstName: true, lastName: true } },
                adminReviewer: { select: { firstName: true, lastName: true } },
            },
        });
        if (!req)
            throw new common_1.NotFoundException('Solicitud no encontrada');
        return req;
    }
    async markSeenByHr(id, reviewerId) {
        const req = await this.findOne(id);
        if (req.status !== client_1.RequestStatus.pendiente_rrhh) {
            throw new common_1.BadRequestException('Solo se puede marcar visto en pendiente RRHH');
        }
        return this.prisma.request.update({ where: { id }, data: { hrSeenAt: new Date(), hrReviewerId: reviewerId } });
    }
    async acceptByHr(id, reviewerId, hrReason) {
        const req = await this.findOne(id);
        if (req.status !== client_1.RequestStatus.pendiente_rrhh) {
            throw new common_1.BadRequestException('Estado inválido para aceptación RRHH');
        }
        const updatedRequest = await this.prisma.request.update({
            where: { id },
            data: {
                status: client_1.RequestStatus.pendiente_admin,
                hrReviewerId: reviewerId,
                hrReason: hrReason,
            },
            include: {
                person: { select: { firstName: true, lastName: true } },
                hrReviewer: { select: { firstName: true, lastName: true } },
            },
        });
        try {
            const requesterFullName = `${updatedRequest.person.firstName} ${updatedRequest.person.lastName}`;
            const hrReviewerName = updatedRequest.hrReviewer ?
                `${updatedRequest.hrReviewer.firstName} ${updatedRequest.hrReviewer.lastName}` :
                undefined;
            await this.emailService.sendApprovedRequestNotificationToAdmin({ type: updatedRequest.type, payload: updatedRequest.payload }, requesterFullName, updatedRequest.code, hrReviewerName);
        }
        catch (error) {
            console.error('❌ Error al enviar notificación a Admin:', error.message);
        }
        return updatedRequest;
    }
    async rejectByHr(id, reviewerId, reason) {
        if (!reason || !reason.trim())
            throw new common_1.BadRequestException('Razón de rechazo requerida');
        const req = await this.findOne(id);
        if (req.status !== client_1.RequestStatus.pendiente_rrhh) {
            throw new common_1.BadRequestException('Estado inválido para rechazo RRHH');
        }
        return this.prisma.request.update({
            where: { id },
            data: {
                status: client_1.RequestStatus.rrhh_rechazada,
                hrReviewerId: reviewerId,
                hrReason: reason,
            },
        });
    }
    async acceptByAdmin(id, reviewerId, adminReason) {
        const req = await this.findOne(id);
        if (req.status !== client_1.RequestStatus.pendiente_admin) {
            throw new common_1.BadRequestException('Estado inválido para aceptación Admin');
        }
        return this.prisma.request.update({
            where: { id },
            data: {
                status: client_1.RequestStatus.aceptada,
                adminReviewerId: reviewerId,
                adminReason: adminReason,
            },
        });
    }
    async rejectByAdmin(id, reviewerId, reason) {
        if (!reason || !reason.trim())
            throw new common_1.BadRequestException('Razón de rechazo requerida');
        const req = await this.findOne(id);
        if (req.status !== client_1.RequestStatus.pendiente_admin) {
            throw new common_1.BadRequestException('Estado inválido para rechazo Admin');
        }
        return this.prisma.request.update({
            where: { id },
            data: {
                status: client_1.RequestStatus.rechazada,
                adminReviewerId: reviewerId,
                adminReason: reason,
            },
        });
    }
    async generateCode() {
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}${mm}${dd}`;
        const totalCount = await this.prisma.request.count();
        const sequentialNumber = String(totalCount + 1).padStart(4, '0');
        return `SOL-${dateStr}-${sequentialNumber}`;
    }
};
exports.RequestsService = RequestsService;
exports.RequestsService = RequestsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService])
], RequestsService);
//# sourceMappingURL=requests.service.js.map