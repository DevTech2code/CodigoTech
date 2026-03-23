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
exports.AssetsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const prisma_error_util_1 = require("../common/utils/prisma-error.util");
let AssetsService = class AssetsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        try {
            if (process.env.DEBUG_ASSETS_SERVICE === 'true') {
                console.log('[AssetsService.create] payload:', JSON.stringify(data));
            }
            const payload = { ...data };
            const dateFields = ['purchaseDate', 'deliveryDate', 'receivedDate'];
            for (const f of dateFields) {
                if (payload[f]) {
                    const d = new Date(payload[f]);
                    if (!isNaN(d.getTime()))
                        payload[f] = d;
                }
            }
            return await this.prisma.asset.create({ data: payload });
        }
        catch (error) {
            console.error('[AssetsService.create] caught error:', error && error.stack ? error.stack : error);
            (0, prisma_error_util_1.handlePrismaError)(error, 'Activo');
        }
    }
    async createBulk(quantity, template) {
        try {
            if (quantity < 1 || quantity > 1000) {
                throw new common_1.BadRequestException('La cantidad debe estar entre 1 y 1000');
            }
            if (process.env.DEBUG_ASSETS_SERVICE === 'true') {
                console.log('[AssetsService.createBulk] quantity:', quantity, 'template:', JSON.stringify(template));
            }
            const basePayload = { ...template };
            const dateFields = ['purchaseDate', 'deliveryDate', 'receivedDate'];
            for (const f of dateFields) {
                if (basePayload[f]) {
                    const d = new Date(basePayload[f]);
                    if (!isNaN(d.getTime()))
                        basePayload[f] = d;
                }
            }
            const assetsToCreate = Array.from({ length: quantity }, (_, idx) => ({
                ...basePayload,
                assetCode: `${basePayload.assetCode}-${String(idx + 1).padStart(3, '0')}`,
            }));
            const result = await this.prisma.asset.createMany({
                data: assetsToCreate,
                skipDuplicates: false,
            });
            return {
                created: result.count,
                quantity: quantity,
                message: `Se crearon ${result.count} activos exitosamente`,
            };
        }
        catch (error) {
            console.error('[AssetsService.createBulk] caught error:', error && error.stack ? error.stack : error);
            (0, prisma_error_util_1.handlePrismaError)(error, 'Activos (creación masiva)');
        }
    }
    async findAll(q, page = 1, limit = 10) {
        const where = {};
        if (q && q.trim().length > 0) {
            const term = q.trim();
            where.OR = [
                { assetCode: { contains: term, mode: 'insensitive' } },
                { brand: { contains: term, mode: 'insensitive' } },
                { model: { contains: term, mode: 'insensitive' } },
                { serialNumber: { contains: term, mode: 'insensitive' } },
            ];
        }
        const take = Number(limit) > 0 ? Number(limit) : 10;
        const skip = (Number(page) > 1 ? Number(page) - 1 : 0) * take;
        const [data, total] = await Promise.all([
            this.prisma.asset.findMany({
                where,
                skip,
                take,
                select: {
                    id: true,
                    assetCode: true,
                    assetType: true,
                    serialNumber: true,
                    brand: true,
                    model: true,
                    status: true,
                    branchId: true,
                    assignedPersonId: true,
                    purchaseDate: true,
                    deliveryDate: true,
                    receivedDate: true,
                    notes: true,
                    attributesJson: true,
                    createdAt: true,
                    updatedAt: true,
                    branch: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }),
            this.prisma.asset.count({ where }),
        ]);
        const totalPages = Math.max(1, Math.ceil(total / take));
        return {
            data,
            total,
            page: Number(page),
            limit: take,
            totalPages,
        };
    }
    async findOne(id) {
        const asset = await this.prisma.asset.findUnique({ where: { id } });
        if (!asset)
            throw new common_1.NotFoundException(`Activo con ID ${id} no encontrado`);
        return asset;
    }
    async update(id, data) {
        try {
            if (process.env.DEBUG_ASSETS_SERVICE === 'true') {
                console.log('[AssetsService.update] id, payload:', id, JSON.stringify(data));
            }
            const existingAsset = await this.prisma.asset.findUnique({ where: { id } });
            if (!existingAsset)
                throw new common_1.NotFoundException(`Activo con ID ${id} no encontrado`);
            const isAssigned = existingAsset.status === 'assigned' || !!existingAsset.assignedPersonId;
            if (isAssigned) {
                if ((data.status !== undefined && data.status !== existingAsset.status) || (data.receivedDate !== undefined && data.receivedDate !== null)) {
                    throw new common_1.BadRequestException('No puedes editar este dispositivo hasta que no tenga una asignación activa');
                }
            }
            const payload = { ...data };
            const dateFields = ['purchaseDate', 'deliveryDate', 'receivedDate'];
            for (const f of dateFields) {
                if (payload[f]) {
                    const d = new Date(payload[f]);
                    if (!isNaN(d.getTime()))
                        payload[f] = d;
                }
            }
            const updateData = {};
            for (const key of Object.keys(payload)) {
                const val = payload[key];
                if (val === undefined)
                    continue;
                if (typeof val === 'string' && val.trim() === '')
                    continue;
                updateData[key] = val;
            }
            if (isAssigned) {
                if (process.env.DEBUG_ASSETS_SERVICE === 'true') {
                    console.log('[AssetsService.update] activo asignado - impidiendo cambios en status/receivedDate/assignedPersonId');
                    console.log('[AssetsService.update] payload antes de limpiar:', payload);
                    console.log('[AssetsService.update] updateData antes de borrar campos:', updateData);
                }
                delete updateData.status;
                delete updateData.receivedDate;
                delete updateData.assignedPersonId;
                if (process.env.DEBUG_ASSETS_SERVICE === 'true') {
                    console.log('[AssetsService.update] updateData después de borrar campos:', updateData);
                }
            }
            if (process.env.DEBUG_ASSETS_SERVICE === 'true') {
                console.log('[AssetsService.update] Ejecutando prisma.asset.update con:', updateData);
            }
            return await this.prisma.asset.update({ where: { id }, data: updateData });
        }
        catch (error) {
            console.error('[AssetsService.update] caught error:', error && error.stack ? error.stack : error);
            (0, prisma_error_util_1.handlePrismaError)(error, 'Activo', id);
        }
    }
    async remove(id) {
        try {
            return await this.prisma.asset.delete({ where: { id } });
        }
        catch (error) {
            (0, prisma_error_util_1.handlePrismaError)(error, 'Activo', id);
        }
    }
    async findOneOwnedByUser(assetId, userId) {
        const asset = await this.prisma.asset.findFirst({
            where: { id: assetId, assignedPersonId: userId },
        });
        if (!asset)
            throw new common_1.NotFoundException('Activo no encontrado o no pertenece al usuario');
        return asset;
    }
    findAllByUser(userId) {
        return this.prisma.asset.findMany({
            where: { assignedPersonId: userId },
        });
    }
    async findByAssignedPersonId(personId) {
        const activeAssignments = await this.prisma.assignmentHistory.findMany({
            where: {
                personId,
                returnDate: null,
            },
            include: {
                asset: {
                    select: {
                        id: true,
                        assetCode: true,
                        assetType: true,
                        brand: true,
                        model: true,
                        serialNumber: true,
                        status: true,
                        purchaseDate: true,
                    },
                },
            },
        });
        return activeAssignments.map(assignment => assignment.asset);
    }
    async findUniqueAssetTypes() {
        const types = await this.prisma.asset.findMany({
            distinct: ['assetType'],
            select: { assetType: true },
        });
        return types.map((t) => t.assetType).filter((t) => t);
    }
    async getAssetsGroupedByPerson() {
        const people = await this.prisma.person.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                departmentId: true,
                roleId: true,
                branchId: true,
                assets: {
                    select: {
                        id: true,
                        assetCode: true,
                        assetType: true,
                        brand: true,
                        model: true,
                        status: true,
                        serialNumber: true,
                        purchaseDate: true,
                        deliveryDate: true,
                        receivedDate: true,
                    },
                },
            },
            orderBy: { id: 'asc' },
        });
        return people.map((p) => ({
            person: {
                id: p.id,
                name: `${p.firstName} ${p.lastName}`.trim(),
                username: p.username,
            },
            assets: p.assets,
            count: p.assets.length,
        }));
    }
};
exports.AssetsService = AssetsService;
exports.AssetsService = AssetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AssetsService);
//# sourceMappingURL=assets.service.js.map