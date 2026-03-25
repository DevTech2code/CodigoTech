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
exports.UtpCableController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const utp_cable_service_1 = require("./utp-cable.service");
const create_utp_cable_dto_1 = require("./dto/create-utp-cable.dto");
const update_utp_cable_dto_1 = require("./dto/update-utp-cable.dto");
const admin_only_decorator_1 = require("../common/decorators/admin-only.decorator");
let UtpCableController = class UtpCableController {
    constructor(utpCableService) {
        this.utpCableService = utpCableService;
    }
    create(dto) {
        return this.utpCableService.create(dto);
    }
    findAll() {
        return this.utpCableService.findAll();
    }
    findOne(id) {
        return this.utpCableService.findOne(id);
    }
    update(id, dto) {
        return this.utpCableService.update(id, dto);
    }
    remove(id) {
        return this.utpCableService.remove(id);
    }
};
exports.UtpCableController = UtpCableController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Crear un nuevo cable UTP',
        description: 'Crea un nuevo registro de cable UTP en el sistema',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Cable UTP creado exitosamente',
        type: create_utp_cable_dto_1.CreateUtpCableDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Datos de entrada inválidos',
    }),
    (0, swagger_1.ApiBody)({
        type: create_utp_cable_dto_1.CreateUtpCableDto,
        description: 'Datos del cable UTP a crear',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_utp_cable_dto_1.CreateUtpCableDto]),
    __metadata("design:returntype", void 0)
], UtpCableController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener todos los cables UTP',
        description: 'Retorna una lista de todos los cables UTP registrados',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Lista de cables UTP obtenida exitosamente',
        type: [create_utp_cable_dto_1.CreateUtpCableDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UtpCableController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener un cable UTP por ID',
        description: 'Retorna un cable UTP específico basado en su ID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'ID del cable UTP',
        example: 1,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Cable UTP encontrado',
        type: create_utp_cable_dto_1.CreateUtpCableDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Cable UTP no encontrado',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'ID inválido',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UtpCableController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualizar un cable UTP',
        description: 'Actualiza los datos de un cable UTP existente',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'ID del cable UTP a actualizar',
        example: 1,
    }),
    (0, swagger_1.ApiBody)({
        type: update_utp_cable_dto_1.UpdateUtpCableDto,
        description: 'Datos actualizados del cable UTP',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Cable UTP actualizado exitosamente',
        type: update_utp_cable_dto_1.UpdateUtpCableDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Cable UTP no encontrado',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_utp_cable_dto_1.UpdateUtpCableDto]),
    __metadata("design:returntype", void 0)
], UtpCableController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({
        summary: 'Eliminar un cable UTP',
        description: 'Elimina un cable UTP del sistema',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'ID del cable UTP a eliminar',
        example: 1,
    }),
    (0, swagger_1.ApiNoContentResponse)({
        description: 'Cable UTP eliminado exitosamente',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Cable UTP no encontrado',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'ID inválido',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UtpCableController.prototype, "remove", null);
exports.UtpCableController = UtpCableController = __decorate([
    (0, admin_only_decorator_1.AdminOnly)(),
    (0, swagger_1.ApiTags)('UTP Cables'),
    (0, common_1.Controller)('utp-cables'),
    __metadata("design:paramtypes", [utp_cable_service_1.UtpCableService])
], UtpCableController);
//# sourceMappingURL=utp-cable.controller.js.map