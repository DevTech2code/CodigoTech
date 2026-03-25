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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const prisma_error_util_1 = require("../common/utils/prisma-error.util");
let DepartmentsService = class DepartmentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        try {
            return await this.prisma.department.create({ data });
        }
        catch (error) {
            (0, prisma_error_util_1.handlePrismaError)(error, 'Departamento');
        }
    }
    async findAll() {
        return this.prisma.department.findMany();
    }
    async findOne(id) {
        const department = await this.prisma.department.findUnique({ where: { id } });
        if (!department) {
            throw new common_1.NotFoundException(`Departamento con ID ${id} no encontrado`);
        }
        return department;
    }
    async update(id, data) {
        try {
            return await this.prisma.department.update({ where: { id }, data });
        }
        catch (error) {
            (0, prisma_error_util_1.handlePrismaError)(error, 'Departamento', id);
        }
    }
    async remove(id) {
        try {
            return await this.prisma.department.delete({ where: { id } });
        }
        catch (error) {
            (0, prisma_error_util_1.handlePrismaError)(error, 'Departamento', id);
        }
    }
};
exports.DepartmentsService = DepartmentsService;
exports.DepartmentsService = DepartmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DepartmentsService);
//# sourceMappingURL=departments.service.js.map