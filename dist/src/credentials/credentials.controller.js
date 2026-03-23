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
exports.CredentialsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const credentials_service_1 = require("./credentials.service");
const create_credential_dto_1 = require("./dto/create-credential.dto");
const update_credential_dto_1 = require("./dto/update-credential.dto");
const admin_only_decorator_1 = require("../common/decorators/admin-only.decorator");
const ApiIdParam = () => (0, swagger_1.ApiParam)({
    name: 'id',
    type: 'number',
    description: 'ID de la credencial',
    example: 1,
});
const ApiBadRequest = (description = 'Solicitud inválida') => (0, swagger_1.ApiBadRequestResponse)({ description });
const ApiNotFound = (description = 'Credencial no encontrada') => (0, swagger_1.ApiNotFoundResponse)({ description });
let CredentialsController = class CredentialsController {
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    findAll() {
        return this.service.findAll();
    }
    async findOne(id) {
        const credential = await this.service.findOne(id);
        if (!credential) {
            throw new common_1.NotFoundException(`Credential with ID ${id} not found`);
        }
        return credential;
    }
    async update(id, dto) {
        const updated = await this.service.update(id, dto);
        if (!updated) {
            throw new common_1.NotFoundException(`Credential with ID ${id} not found`);
        }
        return updated;
    }
    async remove(id) {
        const deleted = await this.service.remove(id);
        if (!deleted) {
            throw new common_1.NotFoundException(`Credential with ID ${id} not found`);
        }
    }
};
exports.CredentialsController = CredentialsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una credencial' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Credencial creada correctamente',
        type: create_credential_dto_1.CreateCredentialDto,
    }),
    ApiBadRequest(),
    (0, swagger_1.ApiBody)({ type: create_credential_dto_1.CreateCredentialDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_credential_dto_1.CreateCredentialDto]),
    __metadata("design:returntype", void 0)
], CredentialsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las credenciales' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Lista de credenciales',
        type: [create_credential_dto_1.CreateCredentialDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CredentialsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una credencial por ID' }),
    ApiIdParam(),
    (0, swagger_1.ApiOkResponse)({
        description: 'Credencial encontrada',
        type: create_credential_dto_1.CreateCredentialDto,
    }),
    ApiNotFound(),
    ApiBadRequest(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CredentialsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una credencial' }),
    ApiIdParam(),
    (0, swagger_1.ApiBody)({ type: update_credential_dto_1.UpdateCredentialDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Credencial actualizada correctamente',
        type: update_credential_dto_1.UpdateCredentialDto,
    }),
    ApiNotFound(),
    ApiBadRequest(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_credential_dto_1.UpdateCredentialDto]),
    __metadata("design:returntype", Promise)
], CredentialsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una credencial' }),
    ApiIdParam(),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Credencial eliminada correctamente' }),
    ApiNotFound(),
    ApiBadRequest(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CredentialsController.prototype, "remove", null);
exports.CredentialsController = CredentialsController = __decorate([
    (0, swagger_1.ApiTags)('Credentials'),
    (0, admin_only_decorator_1.AdminOnly)(),
    (0, common_1.Controller)('credentials'),
    __metadata("design:paramtypes", [credentials_service_1.CredentialsService])
], CredentialsController);
//# sourceMappingURL=credentials.controller.js.map