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
exports.AuthHandlerService = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const auth_cookie_helper_1 = require("../utils/auth-cookie.helper");
let AuthHandlerService = class AuthHandlerService {
    constructor(authService, prisma) {
        this.authService = authService;
        this.prisma = prisma;
    }
    async handleLogin(loginDto, res) {
        const user = await this.authService.validateUser(loginDto.username, loginDto.password);
        const token = await this.authService.login(user);
        (0, auth_cookie_helper_1.setAuthCookie)(res, token.access_token);
        return { message: 'Login exitoso', user: token.user, access_token: token.access_token };
    }
    async handleLogout(req, res) {
        const user = req.user;
        if (!user?.sub)
            throw new common_1.UnauthorizedException('Usuario no autenticado');
        await this.authService.logout(user.sub);
        (0, auth_cookie_helper_1.clearAuthCookie)(res);
        return { message: 'Sesión cerrada' };
    }
    async handleMe(req, res) {
        const user = req.user;
        if (!user?.sub)
            throw new common_1.UnauthorizedException('Usuario no autenticado');
        const person = await this.prisma.person.findUnique({
            where: { id: user.sub },
            select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                nationalId: true,
                status: true,
                departmentId: true,
                roleId: true,
                branchId: true,
                role: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        if (!person)
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        const token = await this.authService.login(person);
        (0, auth_cookie_helper_1.setAuthCookie)(res, token.access_token);
        return person;
    }
};
exports.AuthHandlerService = AuthHandlerService;
exports.AuthHandlerService = AuthHandlerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        prisma_service_1.PrismaService])
], AuthHandlerService);
//# sourceMappingURL=auth-handler.service.js.map