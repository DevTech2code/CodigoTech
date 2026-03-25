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
exports.Rj45ConnectorController = void 0;
const common_1 = require("@nestjs/common");
const rj45_connector_service_1 = require("./rj45-connector.service");
const create_rj45_connector_dto_1 = require("./dto/create-rj45-connector.dto");
const update_rj45_connector_dto_1 = require("./dto/update-rj45-connector.dto");
const swagger_1 = require("@nestjs/swagger");
const admin_only_decorator_1 = require("../common/decorators/admin-only.decorator");
let Rj45ConnectorController = class Rj45ConnectorController {
    constructor(service) {
        this.service = service;
    }
    create(createDto) {
        return this.service.create(createDto);
    }
    findAll() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    update(id, updateDto) {
        return this.service.update(id, updateDto);
    }
    remove(id) {
        return this.service.remove(id);
    }
};
exports.Rj45ConnectorController = Rj45ConnectorController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo conector RJ45' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Conector creado correctamente' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rj45_connector_dto_1.CreateRj45ConnectorDto]),
    __metadata("design:returntype", void 0)
], Rj45ConnectorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos los conectores RJ45' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de conectores' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Rj45ConnectorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un conector RJ45 por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID del conector' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Conector encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Conector no encontrado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], Rj45ConnectorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un conector RJ45' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID del conector' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Conector actualizado correctamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Conector no encontrado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_rj45_connector_dto_1.UpdateRj45ConnectorDto]),
    __metadata("design:returntype", void 0)
], Rj45ConnectorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un conector RJ45' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID del conector' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Conector eliminado correctamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Conector no encontrado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], Rj45ConnectorController.prototype, "remove", null);
exports.Rj45ConnectorController = Rj45ConnectorController = __decorate([
    (0, swagger_1.ApiTags)('RJ45 Connectors'),
    (0, admin_only_decorator_1.AdminOnly)(),
    (0, common_1.Controller)('rj45-connectors'),
    __metadata("design:paramtypes", [rj45_connector_service_1.Rj45ConnectorService])
], Rj45ConnectorController);
//# sourceMappingURL=rj45-connector.controller.js.map