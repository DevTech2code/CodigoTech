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
exports.LoansService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const prisma_error_util_1 = require("../common/utils/prisma-error.util");
let LoansService = class LoansService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        try {
            const asset = await this.prisma.asset.findUnique({ where: { id: data.assetId } });
            if (!asset)
                throw new common_1.NotFoundException(`Activo con ID ${data.assetId} no encontrado`);
            if (asset.status !== 'available') {
                throw new common_1.BadRequestException('El activo no está disponible para préstamo');
            }
            const person = await this.prisma.person.findUnique({ where: { id: data.personId } });
            if (!person)
                throw new common_1.NotFoundException(`Persona con ID ${data.personId} no encontrada`);
            if (!data.loanDays || data.loanDays <= 0) {
                throw new common_1.BadRequestException('Los días de préstamo deben ser mayor que 0');
            }
            const resolvedBranchId = data.branchId !== undefined && data.branchId !== null
                ? data.branchId
                : asset.branchId ?? person.branchId ?? undefined;
            const loanData = {
                ...data,
                branchId: resolvedBranchId,
                loanDate: data.loanDate ? new Date(data.loanDate) : new Date(),
            };
            const result = await this.prisma.$transaction([
                this.prisma.loan.create({
                    data: loanData,
                    include: { asset: true, person: true, branch: true },
                }),
                this.prisma.asset.update({
                    where: { id: data.assetId },
                    data: {
                        status: 'loaned',
                        assignedPersonId: data.personId,
                        branchId: resolvedBranchId ?? asset.branchId,
                        deliveryDate: data.loanDate ? new Date(data.loanDate) : new Date(),
                        receivedDate: null,
                    },
                }),
            ]);
            return { loan: result[0], asset: result[1] };
        }
        catch (error) {
            (0, prisma_error_util_1.handlePrismaError)(error, 'Préstamo');
        }
    }
    findAll() {
        return this.prisma.loan.findMany({
            include: { asset: true, person: true, branch: true },
            orderBy: { loanDate: 'desc' },
        });
    }
    async findByPersonId(personId) {
        return this.prisma.loan.findMany({
            where: { personId },
            include: { asset: true, person: true, branch: true },
            orderBy: { loanDate: 'desc' },
        });
    }
    async findOne(id) {
        const record = await this.prisma.loan.findUnique({
            where: { id },
            include: { asset: true, person: true, branch: true },
        });
        if (!record) {
            throw new common_1.NotFoundException(`Préstamo con ID ${id} no encontrado`);
        }
        return record;
    }
    async update(id, data) {
        try {
            const existing = await this.prisma.loan.findUnique({ where: { id }, include: { asset: true } });
            if (!existing)
                throw new common_1.NotFoundException(`Préstamo con ID ${id} no encontrado`);
            const shouldUpdateAsset = data.returnDate !== undefined || data.returnCondition !== undefined;
            if (shouldUpdateAsset) {
                const receivedDate = data.returnDate ? new Date(data.returnDate) : new Date();
                const txResult = await this.prisma.$transaction([
                    this.prisma.loan.update({ where: { id }, data }),
                    this.prisma.asset.update({
                        where: { id: existing.assetId },
                        data: {
                            status: 'available',
                            assignedPersonId: null,
                            receivedDate,
                        },
                    }),
                ]);
                return { loan: txResult[0], asset: txResult[1] };
            }
            const targetPersonId = data.personId ?? existing.personId;
            const targetPerson = await this.prisma.person.findUnique({ where: { id: targetPersonId } });
            if (!targetPerson)
                throw new common_1.NotFoundException(`Persona con ID ${targetPersonId} no encontrada`);
            const resolvedBranchId = data.branchId !== undefined && data.branchId !== null
                ? data.branchId
                : existing.branchId ?? existing.asset?.branchId ?? targetPerson.branchId ?? undefined;
            const txResult = await this.prisma.$transaction([
                this.prisma.loan.update({
                    where: { id },
                    data: { ...data, personId: targetPersonId, branchId: resolvedBranchId },
                }),
                this.prisma.asset.update({
                    where: { id: existing.assetId },
                    data: {
                        status: 'assigned',
                        assignedPersonId: targetPersonId,
                        branchId: resolvedBranchId ?? existing.asset.branchId,
                    },
                }),
            ]);
            return { loan: txResult[0], asset: txResult[1] };
        }
        catch (error) {
            (0, prisma_error_util_1.handlePrismaError)(error, 'Préstamo', id);
        }
    }
    async remove(id) {
        try {
            const existing = await this.prisma.loan.findUnique({ where: { id } });
            if (!existing)
                throw new common_1.NotFoundException(`Préstamo con ID ${id} no encontrado`);
            const tx = await this.prisma.$transaction([
                this.prisma.loan.delete({ where: { id } }),
                this.prisma.asset.update({
                    where: { id: existing.assetId },
                    data: {
                        status: 'available',
                        assignedPersonId: null,
                        deliveryDate: null,
                        receivedDate: null,
                    },
                }),
            ]);
            return { loan: tx[0], asset: tx[1] };
        }
        catch (error) {
            (0, prisma_error_util_1.handlePrismaError)(error, 'Préstamo', id);
        }
    }
};
exports.LoansService = LoansService;
exports.LoansService = LoansService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LoansService);
//# sourceMappingURL=loans.service.js.map