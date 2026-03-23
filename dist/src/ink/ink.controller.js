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
exports.InkController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ink_service_1 = require("./ink.service");
const create_ink_dto_1 = require("./dto/create-ink.dto");
const update_ink_dto_1 = require("./dto/update-ink.dto");
const admin_only_decorator_1 = require("../common/decorators/admin-only.decorator");
const ApiIdParam = () => (0, swagger_1.ApiParam)({
    name: 'id',
    type: 'number',
    description: 'ID de la tinta',
    example: 1,
});
const ApiBadRequest = (description = 'Datos inválidos') => (0, swagger_1.ApiBadRequestResponse)({ description });
const ApiNotFound = (description = 'Tinta no encontrada') => (0, swagger_1.ApiNotFoundResponse)({ description });
let InkController = class InkController {
    constructor(inkService) {
        this.inkService = inkService;
    }
    create(dto) {
        return this.inkService.create(dto);
    }
    findAll() {
        return this.inkService.findAll();
    }
    async findOne(id) {
        const ink = await this.inkService.findOne(id);
        if (!ink)
            throw new common_1.NotFoundException(`Ink with ID ${id} not found`);
        return ink;
    }
    async update(id, dto) {
        const updated = await this.inkService.update(id, dto);
        if (!updated)
            throw new common_1.NotFoundException(`Ink with ID ${id} not found`);
        return updated;
    }
    async remove(id) {
        const deleted = await this.inkService.remove(id);
        if (!deleted)
            throw new common_1.NotFoundException(`Ink with ID ${id} not found`);
    }
};
exports.InkController = InkController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una nueva tinta' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Tinta creada exitosamente',
        type: create_ink_dto_1.CreateInkDto,
    }),
    ApiBadRequest(),
    (0, swagger_1.ApiBody)({ type: create_ink_dto_1.CreateInkDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ink_dto_1.CreateInkDto]),
    __metadata("design:returntype", void 0)
], InkController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todas las tintas' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Lista de tintas',
        type: [create_ink_dto_1.CreateInkDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InkController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener tinta por ID' }),
    ApiIdParam(),
    (0, swagger_1.ApiOkResponse)({ description: 'Tinta encontrada', type: create_ink_dto_1.CreateInkDto }),
    ApiNotFound(),
    ApiBadRequest('ID inválido'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InkController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar tinta por ID' }),
    ApiIdParam(),
    (0, swagger_1.ApiBody)({ type: update_ink_dto_1.UpdateInkDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Tinta actualizada exitosamente',
        type: update_ink_dto_1.UpdateInkDto,
    }),
    ApiNotFound(),
    ApiBadRequest(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_ink_dto_1.UpdateInkDto]),
    __metadata("design:returntype", Promise)
], InkController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar tinta por ID' }),
    ApiIdParam(),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Tinta eliminada exitosamente' }),
    ApiNotFound(),
    ApiBadRequest(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InkController.prototype, "remove", null);
exports.InkController = InkController = __decorate([
    (0, swagger_1.ApiTags)('Inks'),
    (0, admin_only_decorator_1.AdminOnly)(),
    (0, common_1.Controller)('inks'),
    __metadata("design:paramtypes", [ink_service_1.InkService])
], InkController);
//# sourceMappingURL=ink.controller.js.map