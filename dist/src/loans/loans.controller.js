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
exports.LoansController = void 0;
const common_1 = require("@nestjs/common");
const loans_service_1 = require("./loans.service");
const create_loan_dto_1 = require("./dto/create-loan.dto");
const update_loan_dto_1 = require("./dto/update-loan.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
let LoansController = class LoansController {
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    findAll() {
        return this.service.findAll();
    }
    findMyLoans(req) {
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
exports.LoansController = LoansController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo préstamo' }),
    (0, swagger_1.ApiBody)({ type: create_loan_dto_1.CreateLoanDto }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Préstamo creado exitosamente',
        type: create_loan_dto_1.CreateLoanDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Datos inválidos para crear préstamo',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_loan_dto_1.CreateLoanDto]),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los préstamos' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Lista de préstamos obtenida',
        type: [create_loan_dto_1.CreateLoanDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('user/my-loans'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Admin', 'Usuario', 'Recursos Humanos', 'RRHH', 'Human Resources'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener préstamos del usuario conectado' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Lista de préstamos del usuario',
        type: [create_loan_dto_1.CreateLoanDto],
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "findMyLoans", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un préstamo por ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'ID del préstamo',
        example: 1,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Préstamo encontrado',
        type: create_loan_dto_1.CreateLoanDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Préstamo no encontrado' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'ID inválido' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un préstamo' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'ID del préstamo',
        example: 1,
    }),
    (0, swagger_1.ApiBody)({ type: update_loan_dto_1.UpdateLoanDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Préstamo actualizado exitosamente',
        type: update_loan_dto_1.UpdateLoanDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Préstamo no encontrado' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Datos inválidos o ID inválido' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_loan_dto_1.UpdateLoanDto]),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un préstamo' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'ID del préstamo',
        example: 1,
    }),
    (0, swagger_1.ApiNoContentResponse)({
        description: 'Préstamo eliminado exitosamente',
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Préstamo no encontrado' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'ID inválido' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "remove", null);
exports.LoansController = LoansController = __decorate([
    (0, swagger_1.ApiTags)('Loans'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('loans'),
    __metadata("design:paramtypes", [loans_service_1.LoansService])
], LoansController);
//# sourceMappingURL=loans.controller.js.map