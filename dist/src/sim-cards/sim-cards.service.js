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
exports.SimCardsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const prisma_error_util_1 = require("../common/utils/prisma-error.util");
let SimCardsService = class SimCardsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        try {
            return await this.prisma.simCard.create({ data });
        }
        catch (error) {
            (0, prisma_error_util_1.handlePrismaError)(error, 'SIM card');
        }
    }
    async findAll() {
        return this.prisma.simCard.findMany();
    }
    async findOne(id) {
        const sim = await this.prisma.simCard.findUnique({ where: { id } });
        if (!sim) {
            throw new common_1.NotFoundException(`SIM card con ID ${id} no encontrada`);
        }
        return sim;
    }
    async update(id, data) {
        try {
            return await this.prisma.simCard.update({ where: { id }, data });
        }
        catch (error) {
            (0, prisma_error_util_1.handlePrismaError)(error, 'SIM card', id);
        }
    }
    async remove(id) {
        try {
            return await this.prisma.simCard.delete({ where: { id } });
        }
        catch (error) {
            (0, prisma_error_util_1.handlePrismaError)(error, 'SIM card', id);
        }
    }
};
exports.SimCardsService = SimCardsService;
exports.SimCardsService = SimCardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SimCardsService);
//# sourceMappingURL=sim-cards.service.js.map