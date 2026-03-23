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
exports.NetworkAdapterController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const network_adapter_service_1 = require("./network-adapter.service");
const create_network_adapter_dto_1 = require("./dto/create-network-adapter.dto");
const update_network_adapter_dto_1 = require("./dto/update-network-adapter.dto");
let NetworkAdapterController = class NetworkAdapterController {
    constructor(networkAdapterService) {
        this.networkAdapterService = networkAdapterService;
    }
    create(createNetworkAdapterDto) {
        return this.networkAdapterService.create(createNetworkAdapterDto);
    }
    findAll() {
        return this.networkAdapterService.findAll();
    }
    findOne(id) {
        return this.networkAdapterService.findOne(id);
    }
    update(id, updateNetworkAdapterDto) {
        return this.networkAdapterService.update(id, updateNetworkAdapterDto);
    }
    remove(id) {
        return this.networkAdapterService.remove(id);
    }
};
exports.NetworkAdapterController = NetworkAdapterController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un Adaptador de Red' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_network_adapter_dto_1.CreateNetworkAdapterDto]),
    __metadata("design:returntype", void 0)
], NetworkAdapterController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los Adaptadores de Red' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NetworkAdapterController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un Adaptador de Red por ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NetworkAdapterController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un Adaptador de Red' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_network_adapter_dto_1.UpdateNetworkAdapterDto]),
    __metadata("design:returntype", void 0)
], NetworkAdapterController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un Adaptador de Red' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NetworkAdapterController.prototype, "remove", null);
exports.NetworkAdapterController = NetworkAdapterController = __decorate([
    (0, swagger_1.ApiTags)('network-adapter'),
    (0, common_1.Controller)('network-adapter'),
    __metadata("design:paramtypes", [network_adapter_service_1.NetworkAdapterService])
], NetworkAdapterController);
//# sourceMappingURL=network-adapter.controller.js.map