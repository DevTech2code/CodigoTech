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
exports.UsbService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const prisma_error_util_1 = require("../common/utils/prisma-error.util");
let UsbService = class UsbService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        try {
            return await this.prisma.usb.create({ data: dto });
        }
        catch (error) {
            (0, prisma_error_util_1.handlePrismaError)(error, 'USB');
        }
    }
    async findAll() {
        return this.prisma.usb.findMany({ orderBy: { createdAt: 'desc' } });
    }
    async findOne(id) {
        const usb = await this.prisma.usb.findUnique({ where: { id } });
        if (!usb)
            throw new common_1.NotFoundException(`USB con ID ${id} no encontrado`);
        return usb;
    }
    async update(id, dto) {
        try {
            return await this.prisma.usb.update({ where: { id }, data: dto });
        }
        catch (error) {
            (0, prisma_error_util_1.handlePrismaError)(error, 'USB', id);
        }
    }
    async remove(id) {
        try {
            return await this.prisma.usb.delete({ where: { id } });
        }
        catch (error) {
            (0, prisma_error_util_1.handlePrismaError)(error, 'USB', id);
        }
    }
};
exports.UsbService = UsbService;
exports.UsbService = UsbService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsbService);
//# sourceMappingURL=usb.service.js.map