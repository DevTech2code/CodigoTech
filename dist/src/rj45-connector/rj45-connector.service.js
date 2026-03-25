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
exports.Rj45ConnectorService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const prisma_error_util_1 = require("../common/utils/prisma-error.util");
let Rj45ConnectorService = class Rj45ConnectorService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        try {
            return await this.prisma.rj45Connector.create({ data });
        }
        catch (error) {
            (0, prisma_error_util_1.handlePrismaError)(error, 'Conector RJ45');
        }
    }
    async findAll() {
        return this.prisma.rj45Connector.findMany();
    }
    async findOne(id) {
        const connector = await this.prisma.rj45Connector.findUnique({ where: { id } });
        if (!connector) {
            throw new common_1.NotFoundException(`Conector RJ45 con ID ${id} no encontrado`);
        }
        return connector;
    }
    async update(id, data) {
        try {
            return await this.prisma.rj45Connector.update({ where: { id }, data });
        }
        catch (error) {
            (0, prisma_error_util_1.handlePrismaError)(error, 'Conector RJ45', id);
        }
    }
    async remove(id) {
        try {
            return await this.prisma.rj45Connector.delete({ where: { id } });
        }
        catch (error) {
            (0, prisma_error_util_1.handlePrismaError)(error, 'Conector RJ45', id);
        }
    }
};
exports.Rj45ConnectorService = Rj45ConnectorService;
exports.Rj45ConnectorService = Rj45ConnectorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], Rj45ConnectorService);
//# sourceMappingURL=rj45-connector.service.js.map