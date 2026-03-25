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
exports.MemoryAdapterController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const memory_adapter_service_1 = require("./memory-adapter.service");
const create_memory_adapter_dto_1 = require("./dto/create-memory-adapter.dto");
const update_memory_adapter_dto_1 = require("./dto/update-memory-adapter.dto");
let MemoryAdapterController = class MemoryAdapterController {
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    findAll() {
        return this.service.findAll();
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
exports.MemoryAdapterController = MemoryAdapterController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo adaptador de memoria' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_memory_adapter_dto_1.CreateMemoryAdapterDto]),
    __metadata("design:returntype", void 0)
], MemoryAdapterController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los adaptadores de memoria' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MemoryAdapterController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener adaptador de memoria por ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MemoryAdapterController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar adaptador de memoria' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_memory_adapter_dto_1.UpdateMemoryAdapterDto]),
    __metadata("design:returntype", void 0)
], MemoryAdapterController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar adaptador de memoria' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MemoryAdapterController.prototype, "remove", null);
exports.MemoryAdapterController = MemoryAdapterController = __decorate([
    (0, swagger_1.ApiTags)('memory-adapter'),
    (0, common_1.Controller)('memory-adapter'),
    __metadata("design:paramtypes", [memory_adapter_service_1.MemoryAdapterService])
], MemoryAdapterController);
//# sourceMappingURL=memory-adapter.controller.js.map