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
exports.PowerStripController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const power_strip_service_1 = require("./power-strip.service");
const create_power_strip_dto_1 = require("./dto/create-power-strip.dto");
const update_power_strip_dto_1 = require("./dto/update-power-strip.dto");
const admin_only_decorator_1 = require("../common/decorators/admin-only.decorator");
const ApiIdParam = () => (0, swagger_1.ApiParam)({
    name: 'id',
    type: 'number',
    description: 'ID del multicontacto',
    example: 1,
});
const ApiBadRequest = (description = 'Datos inválidos') => (0, swagger_1.ApiBadRequestResponse)({ description });
const ApiNotFound = (description = 'Multicontacto no encontrado') => (0, swagger_1.ApiNotFoundResponse)({ description });
let PowerStripController = class PowerStripController {
    constructor(service) {
        this.service = service;
    }
    create(createDto) {
        return this.service.create(createDto);
    }
    findAll() {
        return this.service.findAll();
    }
    async findOne(id) {
        const item = await this.service.findOne(id);
        if (!item)
            throw new common_1.NotFoundException(`Power strip with ID ${id} not found`);
        return item;
    }
    async update(id, updateDto) {
        const updated = await this.service.update(id, updateDto);
        if (!updated)
            throw new common_1.NotFoundException(`Power strip with ID ${id} not found`);
        return updated;
    }
    async remove(id) {
        const deleted = await this.service.remove(id);
        if (!deleted)
            throw new common_1.NotFoundException(`Power strip with ID ${id} not found`);
    }
};
exports.PowerStripController = PowerStripController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo multicontacto' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Multicontacto creado exitosamente',
        type: create_power_strip_dto_1.CreatePowerStripDto,
    }),
    ApiBadRequest(),
    (0, swagger_1.ApiBody)({ type: create_power_strip_dto_1.CreatePowerStripDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_power_strip_dto_1.CreatePowerStripDto]),
    __metadata("design:returntype", void 0)
], PowerStripController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos los multicontactos' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Lista de multicontactos',
        type: [create_power_strip_dto_1.CreatePowerStripDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PowerStripController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un multicontacto por ID' }),
    ApiIdParam(),
    (0, swagger_1.ApiOkResponse)({
        description: 'Multicontacto encontrado',
        type: create_power_strip_dto_1.CreatePowerStripDto,
    }),
    ApiNotFound(),
    ApiBadRequest('ID inválido'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PowerStripController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un multicontacto' }),
    ApiIdParam(),
    (0, swagger_1.ApiBody)({ type: update_power_strip_dto_1.UpdatePowerStripDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Multicontacto actualizado',
        type: update_power_strip_dto_1.UpdatePowerStripDto,
    }),
    ApiNotFound(),
    ApiBadRequest(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_power_strip_dto_1.UpdatePowerStripDto]),
    __metadata("design:returntype", Promise)
], PowerStripController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un multicontacto' }),
    ApiIdParam(),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Multicontacto eliminado' }),
    ApiNotFound(),
    ApiBadRequest('ID inválido'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PowerStripController.prototype, "remove", null);
exports.PowerStripController = PowerStripController = __decorate([
    (0, swagger_1.ApiTags)('Power Strips'),
    (0, admin_only_decorator_1.AdminOnly)(),
    (0, common_1.Controller)('power-strips'),
    __metadata("design:paramtypes", [power_strip_service_1.PowerStripService])
], PowerStripController);
//# sourceMappingURL=power-strip.controller.js.map