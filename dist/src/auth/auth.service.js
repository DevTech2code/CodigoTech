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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const prisma_error_util_1 = require("../common/utils/prisma-error.util");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = class AuthService {
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async register(dto) {
        try {
            const password = await this.hash(dto.password);
            const user = await this.prisma.person.create({ data: { ...dto, password } });
            const { password: _, ...safe } = user;
            return { message: 'Usuario registrado', user: safe };
        }
        catch (e) {
            (0, prisma_error_util_1.handlePrismaError)(e, 'Usuario');
        }
    }
    async validateUser(username, password) {
        const user = await this.prisma.person.findUnique({ where: { username }, include: { role: true } });
        if (!user?.password || !(await this.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('Credenciales incorrectas');
        }
        return user;
    }
    async login(user) {
        const roleName = typeof user.role === 'string' ? user.role : user.role?.name;
        const access_token = this.jwt.sign({ username: user.username, sub: user.id, role: roleName });
        return { access_token, user: { id: user.id, username: user.username, role: user.role } };
    }
    logout(userId) {
        return { message: 'Logged out' };
    }
    async changePassword(userId, dto) {
        const user = await this.findUserOrThrow(userId);
        if (!user.password) {
            throw new common_1.NotFoundException('El usuario no tiene contraseña registrada');
        }
        if (!(await this.compare(dto.currentPassword, user.password))) {
            throw new common_1.UnauthorizedException('Contraseña actual incorrecta');
        }
        return this.updatePassword(userId, dto.newPassword, false, 'Contraseña actualizada con éxito');
    }
    async forceChangePassword(userId, newPassword) {
        const user = await this.findUserOrThrow(userId);
        if (!user.mustChangePassword)
            throw new common_1.BadRequestException('No se requiere cambio de contraseña');
        return this.updatePassword(userId, newPassword, false, 'Contraseña actualizada correctamente');
    }
    async resetPasswordToUsername(userId) {
        const user = await this.findUserOrThrow(userId);
        if (!user.username)
            throw new common_1.NotFoundException('Usuario sin nombre de usuario');
        return this.updatePassword(userId, user.username, true, 'Contraseña restablecida al nombre de usuario');
    }
    async hash(text) {
        return bcrypt.hash(text, 10);
    }
    async compare(plain, hashed) {
        return bcrypt.compare(plain, hashed);
    }
    async findUserOrThrow(id) {
        const user = await this.prisma.person.findUnique({ where: { id } });
        if (!user?.password)
            throw new common_1.NotFoundException('Usuario no encontrado');
        return user;
    }
    async updatePassword(id, newPassword, mustChange, message) {
        const hashed = await this.hash(newPassword);
        await this.prisma.person.update({ where: { id }, data: { password: hashed, mustChangePassword: mustChange } });
        return { message };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map