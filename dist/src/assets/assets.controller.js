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
exports.AssetsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const assets_service_1 = require("./assets.service");
const create_asset_dto_1 = require("./dto/create-asset.dto");
const update_asset_dto_1 = require("./dto/update-asset.dto");
const bulk_create_asset_dto_1 = require("./dto/bulk-create-asset.dto");
const admin_only_decorator_1 = require("../common/decorators/admin-only.decorator");
const authenticated_decorator_1 = require("../common/decorators/authenticated.decorator");
let AssetsController = class AssetsController {
    constructor(assetsService) {
        this.assetsService = assetsService;
    }
    create(req, dto) {
        try {
            console.log('[DEBUG] AssetsController.create req.user =', req.user);
        }
        catch (e) {
        }
        return this.assetsService.create(dto);
    }
    createBulk(req, dto) {
        try {
            console.log('[DEBUG] AssetsController.createBulk req.user =', req.user);
        }
        catch (e) {
        }
        return this.assetsService.createBulk(dto.quantity, dto.template);
    }
    findAll(q, page, limit) {
        const pageNum = page ? Number(page) : undefined;
        const limitNum = limit ? Number(limit) : undefined;
        return this.assetsService.findAll(q, pageNum ?? 1, limitNum ?? 10);
    }
    findAllPublic(q, page, limit) {
        const pageNum = page ? Number(page) : undefined;
        const limitNum = limit ? Number(limit) : undefined;
        return this.assetsService.findAll(q, pageNum ?? 1, limitNum ?? 10);
    }
    findOne(id) {
        return this.assetsService.findOne(id);
    }
    update(id, dto) {
        return this.assetsService.update(id, dto);
    }
    remove(id) {
        return this.assetsService.remove(id);
    }
    getAssetsGroupedByPerson() {
        return this.assetsService.getAssetsGroupedByPerson();
    }
};
exports.AssetsController = AssetsController;
__decorate([
    (0, common_1.Post)(),
    (0, admin_only_decorator_1.AdminOnly)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo activo' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Activo creado exitosamente', type: create_asset_dto_1.CreateAssetDto }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Datos inválidos para crear un activo' }),
    (0, swagger_1.ApiBody)({ type: create_asset_dto_1.CreateAssetDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_asset_dto_1.CreateAssetDto]),
    __metadata("design:returntype", void 0)
], AssetsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('bulk'),
    (0, admin_only_decorator_1.AdminOnly)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Crear múltiples activos con las mismas características' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Activos creados exitosamente' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Datos inválidos para crear activos' }),
    (0, swagger_1.ApiBody)({ type: bulk_create_asset_dto_1.BulkCreateAssetDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, bulk_create_asset_dto_1.BulkCreateAssetDto]),
    __metadata("design:returntype", void 0)
], AssetsController.prototype, "createBulk", null);
__decorate([
    (0, common_1.Get)(),
    (0, admin_only_decorator_1.AdminOnly)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los activos (soporta búsqueda y paginación con q,page,limit)' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Lista de activos (paginated)', type: [create_asset_dto_1.CreateAssetDto] }),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], AssetsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('public'),
    (0, authenticated_decorator_1.Authenticated)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los activos (vista pública para usuarios autenticados). Soporta q,page,limit.' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Lista pública de activos (paginated)', type: [create_asset_dto_1.CreateAssetDto] }),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], AssetsController.prototype, "findAllPublic", null);
__decorate([
    (0, common_1.Get)(':id(\\d+)'),
    (0, admin_only_decorator_1.AdminOnly)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un activo por ID (admin)' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', example: 1 }),
    (0, swagger_1.ApiOkResponse)({ description: 'Activo encontrado', type: create_asset_dto_1.CreateAssetDto }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Activo no encontrado' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'ID inválido' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AssetsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id(\\d+)'),
    (0, admin_only_decorator_1.AdminOnly)(),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un activo' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', example: 1 }),
    (0, swagger_1.ApiBody)({ type: update_asset_dto_1.UpdateAssetDto }),
    (0, swagger_1.ApiOkResponse)({ description: 'Activo actualizado', type: update_asset_dto_1.UpdateAssetDto }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Activo no encontrado' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Datos inválidos' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_asset_dto_1.UpdateAssetDto]),
    __metadata("design:returntype", void 0)
], AssetsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id(\\d+)'),
    (0, admin_only_decorator_1.AdminOnly)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un activo' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', example: 1 }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Activo eliminado' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Activo no encontrado' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'ID inválido' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AssetsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('by-person'),
    (0, authenticated_decorator_1.Authenticated)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listado de equipos agrupados por persona' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Agrupación persona → activos' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AssetsController.prototype, "getAssetsGroupedByPerson", null);
exports.AssetsController = AssetsController = __decorate([
    (0, swagger_1.ApiTags)('Assets'),
    (0, admin_only_decorator_1.AdminOnly)(),
    (0, common_1.Controller)('assets'),
    __metadata("design:paramtypes", [assets_service_1.AssetsService])
], AssetsController);
//# sourceMappingURL=assets.controller.js.map