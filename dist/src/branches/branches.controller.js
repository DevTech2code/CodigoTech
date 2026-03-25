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
exports.BranchesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const branches_service_1 = require("./branches.service");
const create_branch_dto_1 = require("./dto/create-branch.dto");
const update_branch_dto_1 = require("./dto/update-branch.dto");
const admin_only_decorator_1 = require("../common/decorators/admin-only.decorator");
const ApiIdParam = () => (0, swagger_1.ApiParam)({
    name: 'id',
    type: 'number',
    description: 'ID de la sucursal',
    example: 1,
});
const ApiBadRequest = (description = 'Solicitud inválida') => (0, swagger_1.ApiBadRequestResponse)({ description });
const ApiNotFound = (description = 'Sucursal no encontrada') => (0, swagger_1.ApiNotFoundResponse)({ description });
let BranchesController = class BranchesController {
    constructor(branchesService) {
        this.branchesService = branchesService;
    }
    create(dto) {
        return this.branchesService.create(dto);
    }
    findAll() {
        return this.branchesService.findAll();
    }
    async findOne(id) {
        const branch = await this.branchesService.findOne(id);
        if (!branch)
            throw new common_1.NotFoundException(`Branch with ID ${id} not found`);
        return branch;
    }
    async update(id, dto) {
        const updated = await this.branchesService.update(id, dto);
        if (!updated)
            throw new common_1.NotFoundException(`Branch with ID ${id} not found`);
        return updated;
    }
    async remove(id) {
        const deleted = await this.branchesService.remove(id);
        if (!deleted)
            throw new common_1.NotFoundException(`Branch with ID ${id} not found`);
    }
};
exports.BranchesController = BranchesController;
__decorate([
    (0, common_1.Post)(),
    (0, admin_only_decorator_1.AdminOnly)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una nueva sucursal' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Sucursal creada correctamente',
        type: create_branch_dto_1.CreateBranchDto,
    }),
    ApiBadRequest(),
    (0, swagger_1.ApiBody)({ type: create_branch_dto_1.CreateBranchDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_branch_dto_1.CreateBranchDto]),
    __metadata("design:returntype", void 0)
], BranchesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las sucursales' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Lista de sucursales',
        type: [create_branch_dto_1.CreateBranchDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BranchesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una sucursal por ID' }),
    ApiIdParam(),
    (0, swagger_1.ApiOkResponse)({
        description: 'Sucursal encontrada',
        type: create_branch_dto_1.CreateBranchDto,
    }),
    ApiNotFound(),
    ApiBadRequest(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BranchesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, admin_only_decorator_1.AdminOnly)(),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una sucursal' }),
    ApiIdParam(),
    (0, swagger_1.ApiBody)({ type: update_branch_dto_1.UpdateBranchDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Sucursal actualizada correctamente',
        type: update_branch_dto_1.UpdateBranchDto,
    }),
    ApiNotFound(),
    ApiBadRequest(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_branch_dto_1.UpdateBranchDto]),
    __metadata("design:returntype", Promise)
], BranchesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, admin_only_decorator_1.AdminOnly)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una sucursal' }),
    ApiIdParam(),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Sucursal eliminada correctamente' }),
    ApiNotFound(),
    ApiBadRequest(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BranchesController.prototype, "remove", null);
exports.BranchesController = BranchesController = __decorate([
    (0, swagger_1.ApiTags)('Branches'),
    (0, common_1.Controller)('branches'),
    __metadata("design:paramtypes", [branches_service_1.BranchesService])
], BranchesController);
//# sourceMappingURL=branches.controller.js.map