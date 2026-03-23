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
exports.AdminPeopleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_only_decorator_1 = require("../../common/decorators/admin-only.decorator");
const people_service_1 = require("../people.service");
const create_person_dto_1 = require("../dto/create-person.dto");
const update_person_dto_1 = require("../dto/update-person.dto");
const ApiIdParam = () => (0, swagger_1.ApiParam)({
    name: 'id',
    type: 'number',
    description: 'ID de la persona',
    example: 1,
});
const ApiBadRequest = (description = 'Datos inválidos') => (0, swagger_1.ApiBadRequestResponse)({ description });
const ApiNotFound = (description = 'Persona no encontrada') => (0, swagger_1.ApiNotFoundResponse)({ description });
let AdminPeopleController = class AdminPeopleController {
    constructor(peopleService) {
        this.peopleService = peopleService;
    }
    create(dto) {
        return this.peopleService.create(dto);
    }
    findAll(q, page, limit) {
        const pageNum = page ? Number(page) : undefined;
        const limitNum = limit ? Number(limit) : undefined;
        return this.peopleService.findAll(q, pageNum, limitNum);
    }
    async findOne(id) {
        const person = await this.peopleService.findOne(id);
        if (!person)
            throw new common_1.NotFoundException(`Person with ID ${id} not found`);
        return person;
    }
    async update(id, dto) {
        const updated = await this.peopleService.update(id, dto);
        if (!updated)
            throw new common_1.NotFoundException(`Person with ID ${id} not found`);
        return updated;
    }
    async remove(id) {
        const deleted = await this.peopleService.remove(id);
        if (!deleted)
            throw new common_1.NotFoundException(`Person with ID ${id} not found`);
    }
};
exports.AdminPeopleController = AdminPeopleController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una nueva persona' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Persona creada exitosamente',
        type: create_person_dto_1.CreatePersonDto,
    }),
    ApiBadRequest(),
    (0, swagger_1.ApiBody)({ type: create_person_dto_1.CreatePersonDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_person_dto_1.CreatePersonDto]),
    __metadata("design:returntype", void 0)
], AdminPeopleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las personas (soporta búsqueda y paginación con query params q,page,limit)' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Lista de personas (paginated)',
        type: [create_person_dto_1.CreatePersonDto],
    }),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], AdminPeopleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener persona por ID' }),
    ApiIdParam(),
    (0, swagger_1.ApiOkResponse)({ description: 'Persona encontrada', type: create_person_dto_1.CreatePersonDto }),
    ApiNotFound(),
    ApiBadRequest('ID inválido'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminPeopleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una persona' }),
    ApiIdParam(),
    (0, swagger_1.ApiBody)({ type: update_person_dto_1.UpdatePersonDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Persona actualizada',
        type: update_person_dto_1.UpdatePersonDto,
    }),
    ApiNotFound(),
    ApiBadRequest(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_person_dto_1.UpdatePersonDto]),
    __metadata("design:returntype", Promise)
], AdminPeopleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una persona' }),
    ApiIdParam(),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Persona eliminada' }),
    ApiNotFound(),
    ApiBadRequest('ID inválido'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminPeopleController.prototype, "remove", null);
exports.AdminPeopleController = AdminPeopleController = __decorate([
    (0, swagger_1.ApiTags)('People'),
    (0, admin_only_decorator_1.AdminOnly)(),
    (0, common_1.Controller)('people'),
    __metadata("design:paramtypes", [people_service_1.PeopleService])
], AdminPeopleController);
//# sourceMappingURL=admin.people.controller.js.map