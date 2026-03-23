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
exports.InkService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const prisma_error_util_1 = require("../common/utils/prisma-error.util");
let InkService = class InkService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        try {
            return await this.prisma.ink.create({ data: dto });
        }
        catch (error) {
            (0, prisma_error_util_1.handlePrismaError)(error, 'Tinta');
        }
    }
    async findAll() {
        return this.prisma.ink.findMany();
    }
    async findOne(id) {
        const ink = await this.prisma.ink.findUnique({ where: { id } });
        if (!ink)
            throw new common_1.NotFoundException(`Tinta con ID ${id} no encontrada`);
        return ink;
    }
    async update(id, dto) {
        try {
            return await this.prisma.ink.update({ where: { id }, data: dto });
        }
        catch (error) {
            (0, prisma_error_util_1.handlePrismaError)(error, 'Tinta', id);
        }
    }
    async remove(id) {
        try {
            return await this.prisma.ink.delete({ where: { id } });
        }
        catch (error) {
            (0, prisma_error_util_1.handlePrismaError)(error, 'Tinta', id);
        }
    }
};
exports.InkService = InkService;
exports.InkService = InkService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InkService);
//# sourceMappingURL=ink.service.js.map