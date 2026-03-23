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
exports.SimCardsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sim_cards_service_1 = require("./sim-cards.service");
const create_sim_card_dto_1 = require("./dto/create-sim-card.dto");
const update_sim_card_dto_1 = require("./dto/update-sim-card.dto");
const admin_only_decorator_1 = require("../common/decorators/admin-only.decorator");
const ApiIdParam = () => (0, swagger_1.ApiParam)({
    name: 'id',
    type: 'number',
    description: 'ID de la tarjeta SIM',
    example: 1,
});
const ApiBadRequest = (description = 'Datos inválidos') => (0, swagger_1.ApiBadRequestResponse)({ description });
const ApiNotFound = (description = 'Tarjeta SIM no encontrada') => (0, swagger_1.ApiNotFoundResponse)({ description });
let SimCardsController = class SimCardsController {
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
        const sim = this.service.findOne(id);
        if (!sim)
            throw new common_1.NotFoundException(`SIM card with ID ${id} not found`);
        return sim;
    }
    update(id, dto) {
        const updated = this.service.update(id, dto);
        if (!updated)
            throw new common_1.NotFoundException(`SIM card with ID ${id} not found`);
        return updated;
    }
    remove(id) {
        const deleted = this.service.remove(id);
        if (!deleted)
            throw new common_1.NotFoundException(`SIM card with ID ${id} not found`);
    }
};
exports.SimCardsController = SimCardsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una tarjeta SIM' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Tarjeta SIM creada', type: create_sim_card_dto_1.CreateSimCardDto }),
    ApiBadRequest(),
    (0, swagger_1.ApiBody)({ type: create_sim_card_dto_1.CreateSimCardDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sim_card_dto_1.CreateSimCardDto]),
    __metadata("design:returntype", void 0)
], SimCardsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todas las tarjetas SIM' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Lista de tarjetas SIM', type: [create_sim_card_dto_1.CreateSimCardDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SimCardsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una tarjeta SIM por ID' }),
    ApiIdParam(),
    (0, swagger_1.ApiOkResponse)({ description: 'Tarjeta SIM encontrada', type: create_sim_card_dto_1.CreateSimCardDto }),
    ApiNotFound(),
    ApiBadRequest('ID inválido'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SimCardsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una tarjeta SIM' }),
    ApiIdParam(),
    (0, swagger_1.ApiBody)({ type: update_sim_card_dto_1.UpdateSimCardDto }),
    (0, swagger_1.ApiOkResponse)({ description: 'Tarjeta SIM actualizada', type: update_sim_card_dto_1.UpdateSimCardDto }),
    ApiNotFound(),
    ApiBadRequest(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_sim_card_dto_1.UpdateSimCardDto]),
    __metadata("design:returntype", void 0)
], SimCardsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una tarjeta SIM' }),
    ApiIdParam(),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Tarjeta SIM eliminada' }),
    ApiNotFound(),
    ApiBadRequest('ID inválido'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SimCardsController.prototype, "remove", null);
exports.SimCardsController = SimCardsController = __decorate([
    (0, swagger_1.ApiTags)('Sim Cards'),
    (0, admin_only_decorator_1.AdminOnly)(),
    (0, common_1.Controller)('sim-cards'),
    __metadata("design:paramtypes", [sim_cards_service_1.SimCardsService])
], SimCardsController);
//# sourceMappingURL=sim-cards.controller.js.map