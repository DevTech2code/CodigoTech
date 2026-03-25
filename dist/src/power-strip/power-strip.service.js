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
exports.PowerStripService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const prisma_error_util_1 = require("../common/utils/prisma-error.util");
let PowerStripService = class PowerStripService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        try {
            return await this.prisma.powerStrip.create({ data });
        }
        catch (error) {
            (0, prisma_error_util_1.handlePrismaError)(error, 'Regleta');
        }
    }
    async findAll() {
        return this.prisma.powerStrip.findMany();
    }
    async findOne(id) {
        const item = await this.prisma.powerStrip.findUnique({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException(`Regleta con ID ${id} no encontrada`);
        return item;
    }
    async update(id, data) {
        try {
            return await this.prisma.powerStrip.update({ where: { id }, data });
        }
        catch (error) {
            (0, prisma_error_util_1.handlePrismaError)(error, 'Regleta', id);
        }
    }
    async remove(id) {
        try {
            return await this.prisma.powerStrip.delete({ where: { id } });
        }
        catch (error) {
            (0, prisma_error_util_1.handlePrismaError)(error, 'Regleta', id);
        }
    }
};
exports.PowerStripService = PowerStripService;
exports.PowerStripService = PowerStripService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PowerStripService);
//# sourceMappingURL=power-strip.service.js.map