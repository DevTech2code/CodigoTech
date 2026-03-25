"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeopleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const client_1 = require("@prisma/client");
let PeopleService = class PeopleService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        try {
            if (data.password) {
                const salt = await bcrypt.genSalt(10);
                data.password = await bcrypt.hash(data.password, salt);
            }
            return await this.prisma.person.create({ data });
        }
        catch (error) {
            this.handlePrismaError(error);
        }
    }
    async findAll(q, page = 1, limit = 999999) {
        const where = {};
        if (q && q.trim().length > 0) {
            const term = q.trim();
            where.OR = [
                { firstName: { contains: term, mode: 'insensitive' } },
                { lastName: { contains: term, mode: 'insensitive' } },
                { username: { contains: term, mode: 'insensitive' } },
                { nationalId: { contains: term, mode: 'insensitive' } },
            ];
        }
        const take = Number(limit) > 0 ? Number(limit) : 999999;
        const skip = (Number(page) > 1 ? Number(page) - 1 : 0) * take;
        const [data, total] = await Promise.all([
            this.prisma.person.findMany({
                where,
                include: { department: true, role: true, branch: true },
                skip,
                take,
            }),
            this.prisma.person.count({ where }),
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
        const person = await this.prisma.person.findUnique({
            where: { id },
            include: {
                department: true,
                role: true,
                branch: true,
            },
        });
        if (!person) {
            throw new common_1.NotFoundException(`Persona con ID ${id} no encontrada`);
        }
        return person;
    }
    async update(id, data) {
        try {
            const payload = { ...data };
            if (payload.password) {
                const salt = await bcrypt.genSalt(10);
                payload.password = await bcrypt.hash(payload.password, salt);
            }
            const numericFields = ['departmentId', 'roleId', 'branchId'];
            for (const f of numericFields) {
                if (payload[f] !== undefined && payload[f] !== null && typeof payload[f] === 'string') {
                    const n = Number(payload[f]);
                    if (!isNaN(n))
                        payload[f] = n;
                }
            }
            return await this.prisma.person.update({
                where: { id },
                data: payload,
            });
        }
        catch (error) {
            console.error('[PeopleService.update] caught error:', error && error.stack ? error.stack : error);
            this.handlePrismaError(error, id);
        }
    }
    async remove(id) {
        try {
            const person = await this.prisma.person.findUnique({
                where: { id },
                include: { role: true },
            });
            if (!person) {
                throw new common_1.NotFoundException(`Persona con ID ${id} no encontrada`);
            }
            const isAdmin = person.role?.name?.toLowerCase() === 'admin';
            if (isAdmin) {
                const adminCount = await this.prisma.person.count({
                    where: { role: { is: { name: 'Admin' } } },
                });
                if (adminCount <= 1) {
                    throw new common_1.BadRequestException('No se puede eliminar: debe existir al menos un Administrador en el sistema');
                }
            }
            return await this.prisma.person.delete({ where: { id } });
        }
        catch (error) {
            this.handlePrismaError(error, id);
        }
    }
    async findUserDetails(id) {
        return this.prisma.person.findUnique({
            where: { id },
            include: {
                branch: true,
                department: true,
                role: true,
                assets: true,
            },
        });
    }
    handlePrismaError(error, id) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case 'P2025':
                    throw new common_1.NotFoundException(`Persona con ID ${id} no encontrada`);
                case 'P2002':
                    throw new common_1.BadRequestException('Ya existe una persona con ese valor único');
                default:
                    throw new common_1.BadRequestException('Error en la solicitud');
            }
        }
        throw new common_1.InternalServerErrorException('Error interno del servidor');
    }
};
exports.PeopleService = PeopleService;
exports.PeopleService = PeopleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PeopleService);
//# sourceMappingURL=people.service.js.map