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
exports.StorageController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const storage_service_1 = require("./storage.service");
const create_storage_dto_1 = require("./dto/create-storage.dto");
const update_storage_dto_1 = require("./dto/update-storage.dto");
const admin_only_decorator_1 = require("../common/decorators/admin-only.decorator");
const ApiIdParam = () => (0, swagger_1.ApiParam)({
    name: 'id',
    type: 'number',
    description: 'ID del almacenamiento',
    example: 1,
});
const ApiBadRequest = (description = 'Datos de entrada inválidos') => (0, swagger_1.ApiBadRequestResponse)({ description });
const ApiNotFound = (description = 'Almacenamiento no encontrado') => (0, swagger_1.ApiNotFoundResponse)({ description });
let StorageController = class StorageController {
    constructor(storageService) {
        this.storageService = storageService;
    }
    create(dto) {
        return this.storageService.create(dto);
    }
    findAll() {
        return this.storageService.findAll();
    }
    async findOne(id) {
        const storage = await this.storageService.findOne(id);
        if (!storage) {
            throw new common_1.NotFoundException(`Storage with ID ${id} not found`);
        }
        return storage;
    }
    async update(id, dto) {
        const updated = await this.storageService.update(id, dto);
        if (!updated) {
            throw new common_1.NotFoundException(`Storage with ID ${id} not found`);
        }
        return updated;
    }
    async remove(id) {
        const deleted = await this.storageService.remove(id);
        if (!deleted) {
            throw new common_1.NotFoundException(`Storage with ID ${id} not found`);
        }
    }
};
exports.StorageController = StorageController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo almacenamiento' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Almacenamiento creado exitosamente',
        type: create_storage_dto_1.CreateStorageDto,
    }),
    (0, swagger_1.ApiBody)({ type: create_storage_dto_1.CreateStorageDto }),
    ApiBadRequest(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_storage_dto_1.CreateStorageDto]),
    __metadata("design:returntype", void 0)
], StorageController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los almacenamientos' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Lista de almacenamientos',
        type: [create_storage_dto_1.CreateStorageDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StorageController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un almacenamiento por ID' }),
    ApiIdParam(),
    (0, swagger_1.ApiOkResponse)({
        description: 'Almacenamiento encontrado',
        type: create_storage_dto_1.CreateStorageDto,
    }),
    ApiNotFound(),
    ApiBadRequest('ID inválido'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un almacenamiento' }),
    ApiIdParam(),
    (0, swagger_1.ApiBody)({ type: update_storage_dto_1.UpdateStorageDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Actualizado exitosamente',
        type: update_storage_dto_1.UpdateStorageDto,
    }),
    ApiNotFound(),
    ApiBadRequest(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_storage_dto_1.UpdateStorageDto]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un almacenamiento' }),
    ApiIdParam(),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Eliminado exitosamente' }),
    ApiNotFound(),
    ApiBadRequest('ID inválido'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "remove", null);
exports.StorageController = StorageController = __decorate([
    (0, swagger_1.ApiTags)('Storage'),
    (0, admin_only_decorator_1.AdminOnly)(),
    (0, common_1.Controller)('storage'),
    __metadata("design:paramtypes", [storage_service_1.StorageService])
], StorageController);
//# sourceMappingURL=storage.controller.js.map