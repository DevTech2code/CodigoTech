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
exports.AssignmentHistoryController = void 0;
const common_1 = require("@nestjs/common");
const assignment_history_service_1 = require("./assignment-history.service");
const create_assignment_history_dto_1 = require("./dto/create-assignment-history.dto");
const update_assignment_history_dto_1 = require("./dto/update-assignment-history.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
let AssignmentHistoryController = class AssignmentHistoryController {
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    findAll() {
        return this.service.findAll();
    }
    findMyAssignments(req) {
        const personId = req.user.personId || req.user.sub;
        return this.service.findByPersonId(personId);
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    remove(id) {
        return this.service.remove(id);
    }
};
exports.AssignmentHistoryController = AssignmentHistoryController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo historial de asignación' }),
    (0, swagger_1.ApiBody)({ type: create_assignment_history_dto_1.CreateAssignmentHistoryDto }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Historial creado exitosamente',
        type: create_assignment_history_dto_1.CreateAssignmentHistoryDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Datos inválidos para crear historial',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_assignment_history_dto_1.CreateAssignmentHistoryDto]),
    __metadata("design:returntype", void 0)
], AssignmentHistoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los historiales de asignación' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Lista de historiales obtenida',
        type: [create_assignment_history_dto_1.CreateAssignmentHistoryDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AssignmentHistoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('user/my-assignments'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Admin', 'Usuario', 'Recursos Humanos', 'RRHH', 'Human Resources'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener asignaciones del usuario conectado' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Lista de asignaciones del usuario',
        type: [create_assignment_history_dto_1.CreateAssignmentHistoryDto],
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AssignmentHistoryController.prototype, "findMyAssignments", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un historial por ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'ID del historial',
        example: 1,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Historial encontrado',
        type: create_assignment_history_dto_1.CreateAssignmentHistoryDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Historial no encontrado' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'ID inválido' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AssignmentHistoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un historial de asignación' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'ID del historial a actualizar',
        example: 1,
    }),
    (0, swagger_1.ApiBody)({ type: update_assignment_history_dto_1.UpdateAssignmentHistoryDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Historial actualizado',
        type: update_assignment_history_dto_1.UpdateAssignmentHistoryDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Historial no encontrado' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Datos inválidos para actualizar' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_assignment_history_dto_1.UpdateAssignmentHistoryDto]),
    __metadata("design:returntype", void 0)
], AssignmentHistoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un historial de asignación' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'ID del historial a eliminar',
        example: 1,
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Historial eliminado exitosamente' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Historial no encontrado' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'ID inválido' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AssignmentHistoryController.prototype, "remove", null);
exports.AssignmentHistoryController = AssignmentHistoryController = __decorate([
    (0, swagger_1.ApiTags)('Assignment History'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('assignment-history'),
    __metadata("design:paramtypes", [assignment_history_service_1.AssignmentHistoryService])
], AssignmentHistoryController);
//# sourceMappingURL=assignment-history.controller.js.map