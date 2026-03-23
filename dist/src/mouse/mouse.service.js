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
exports.MouseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const prisma_error_util_1 = require("../common/utils/prisma-error.util");
let MouseService = class MouseService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        try {
            return await this.prisma.mouse.create({ data: dto });
        }
        catch (error) {
            (0, prisma_error_util_1.handlePrismaError)(error, 'Mouse');
        }
    }
    async findAll() {
        return this.prisma.mouse.findMany({ orderBy: { createdAt: 'desc' } });
    }
    async findOne(id) {
        const mouse = await this.prisma.mouse.findUnique({ where: { id } });
        if (!mouse)
            throw new common_1.NotFoundException(`Mouse con ID ${id} no encontrado`);
        return mouse;
    }
    async update(id, dto) {
        try {
            return await this.prisma.mouse.update({ where: { id }, data: dto });
        }
        catch (error) {
            (0, prisma_error_util_1.handlePrismaError)(error, 'Mouse', id);
        }
    }
    async remove(id) {
        try {
            return await this.prisma.mouse.delete({ where: { id } });
        }
        catch (error) {
            (0, prisma_error_util_1.handlePrismaError)(error, 'Mouse', id);
        }
    }
};
exports.MouseService = MouseService;
exports.MouseService = MouseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MouseService);
//# sourceMappingURL=mouse.service.js.map