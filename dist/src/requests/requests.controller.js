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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const requests_service_1 = require("./requests.service");
const client_1 = require("@prisma/client");
let RequestsController = class RequestsController {
    constructor(service) {
        this.service = service;
    }
    async create(req, body) {
        const personId = req.user.personId || req.user.sub;
        const userRole = req.user.role?.name || req.user.role || '';
        return this.service.create(Number(personId), { type: body.type, payload: body.payload }, userRole);
    }
    async list(req, status) {
        const st = status ? client_1.RequestStatus[status] ?? undefined : undefined;
        return this.service.findAllForRole(req.user, st);
    }
    async getOne(id) {
        return this.service.findOne(id);
    }
    async seenByHr(id, req) {
        return this.service.markSeenByHr(id, Number(req.user.personId ?? req.user.sub));
    }
    async acceptByHr(id, req, body) {
        return this.service.acceptByHr(id, Number(req.user.personId ?? req.user.sub), body?.reason);
    }
    async rejectByHr(id, req, body) {
        return this.service.rejectByHr(id, Number(req.user.personId ?? req.user.sub), body?.reason);
    }
    async acceptByAdmin(id, req, body) {
        return this.service.acceptByAdmin(id, Number(req.user.personId ?? req.user.sub), body?.reason);
    }
    async rejectByAdmin(id, req, body) {
        return this.service.rejectByAdmin(id, Number(req.user.personId ?? req.user.sub), body?.reason);
    }
};
exports.RequestsController = RequestsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear solicitud (usuario)' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RequestsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Usuario', 'Admin', 'Administrador', 'Recursos Humanos', 'RRHH', 'Human Resources'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar solicitudes (por rol). Opcional filtrar por status' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RequestsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Usuario', 'Admin', 'Administrador', 'Recursos Humanos', 'RRHH', 'Human Resources'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RequestsController.prototype, "getOne", null);
__decorate([
    (0, common_1.Patch)(':id/seen-by-hr'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Recursos Humanos', 'RRHH', 'Human Resources', 'Admin', 'Administrador'),
    (0, swagger_1.ApiOperation)({ summary: 'Marcar visto por RRHH' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RequestsController.prototype, "seenByHr", null);
__decorate([
    (0, common_1.Patch)(':id/accept-by-hr'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Recursos Humanos', 'RRHH', 'Human Resources', 'Admin', 'Administrador'),
    (0, swagger_1.ApiOperation)({ summary: 'Aceptar por RRHH (pasa a pendiente_admin)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], RequestsController.prototype, "acceptByHr", null);
__decorate([
    (0, common_1.Patch)(':id/reject-by-hr'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Recursos Humanos', 'RRHH', 'Human Resources', 'Admin', 'Administrador'),
    (0, swagger_1.ApiOperation)({ summary: 'Rechazar por RRHH (requiere razón, estado rrhh_rechazada)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], RequestsController.prototype, "rejectByHr", null);
__decorate([
    (0, common_1.Patch)(':id/accept-by-admin'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Admin', 'Administrador'),
    (0, swagger_1.ApiOperation)({ summary: 'Aceptar por Admin (estado aceptada)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], RequestsController.prototype, "acceptByAdmin", null);
__decorate([
    (0, common_1.Patch)(':id/reject-by-admin'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Admin', 'Administrador'),
    (0, swagger_1.ApiOperation)({ summary: 'Rechazar por Admin (requiere razón, estado rechazada)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], RequestsController.prototype, "rejectByAdmin", null);
exports.RequestsController = RequestsController = __decorate([
    (0, swagger_1.ApiTags)('Requests'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('requests'),
    __metadata("design:paramtypes", [requests_service_1.RequestsService])
], RequestsController);
//# sourceMappingURL=requests.controller.js.map