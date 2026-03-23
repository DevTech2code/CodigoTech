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
exports.DepartmentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const departments_service_1 = require("./departments.service");
const create_department_dto_1 = require("./dto/create-department.dto");
const update_department_dto_1 = require("./dto/update-department.dto");
const admin_only_decorator_1 = require("../common/decorators/admin-only.decorator");
const ApiIdParam = () => (0, swagger_1.ApiParam)({
    name: 'id',
    type: 'number',
    description: 'ID del departamento',
    example: 1,
});
const ApiBadRequest = (description = 'Solicitud inválida') => (0, swagger_1.ApiBadRequestResponse)({ description });
const ApiNotFound = (description = 'Departamento no encontrado') => (0, swagger_1.ApiNotFoundResponse)({ description });
let DepartmentsController = class DepartmentsController {
    constructor(departmentsService) {
        this.departmentsService = departmentsService;
    }
    create(dto) {
        return this.departmentsService.create(dto);
    }
    findAll() {
        return this.departmentsService.findAll();
    }
    async findOne(id) {
        const dept = await this.departmentsService.findOne(id);
        if (!dept)
            throw new common_1.NotFoundException(`Department with ID ${id} not found`);
        return dept;
    }
    async update(id, dto) {
        const updated = await this.departmentsService.update(id, dto);
        if (!updated)
            throw new common_1.NotFoundException(`Department with ID ${id} not found`);
        return updated;
    }
    async remove(id) {
        const deleted = await this.departmentsService.remove(id);
        if (!deleted)
            throw new common_1.NotFoundException(`Department with ID ${id} not found`);
    }
};
exports.DepartmentsController = DepartmentsController;
__decorate([
    (0, common_1.Post)(),
    (0, admin_only_decorator_1.AdminOnly)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo departamento' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Departamento creado correctamente',
        type: create_department_dto_1.CreateDepartmentDto,
    }),
    ApiBadRequest(),
    (0, swagger_1.ApiBody)({ type: create_department_dto_1.CreateDepartmentDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_department_dto_1.CreateDepartmentDto]),
    __metadata("design:returntype", void 0)
], DepartmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los departamentos' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Lista de departamentos',
        type: [create_department_dto_1.CreateDepartmentDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DepartmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un departamento por ID' }),
    ApiIdParam(),
    (0, swagger_1.ApiOkResponse)({
        description: 'Departamento encontrado',
        type: create_department_dto_1.CreateDepartmentDto,
    }),
    ApiNotFound(),
    ApiBadRequest(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, admin_only_decorator_1.AdminOnly)(),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un departamento por ID' }),
    ApiIdParam(),
    (0, swagger_1.ApiBody)({ type: update_department_dto_1.UpdateDepartmentDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Departamento actualizado',
        type: update_department_dto_1.UpdateDepartmentDto,
    }),
    ApiNotFound(),
    ApiBadRequest(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_department_dto_1.UpdateDepartmentDto]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, admin_only_decorator_1.AdminOnly)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un departamento por ID' }),
    ApiIdParam(),
    (0, swagger_1.ApiNoContentResponse)({
        description: 'Departamento eliminado correctamente',
    }),
    ApiNotFound(),
    ApiBadRequest(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "remove", null);
exports.DepartmentsController = DepartmentsController = __decorate([
    (0, swagger_1.ApiTags)('Departments'),
    (0, common_1.Controller)('departments'),
    __metadata("design:paramtypes", [departments_service_1.DepartmentsService])
], DepartmentsController);
//# sourceMappingURL=departments.controller.js.map