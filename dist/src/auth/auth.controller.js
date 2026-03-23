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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const login_dto_1 = require("./dto/login.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const auth_handler_service_1 = require("./services/auth-handler.service");
const prisma_service_1 = require("../prisma/prisma.service");
const change_password_dto_1 = require("./dto/change-password.dto");
const auth_service_1 = require("./auth.service");
const force_change_password_dto_1 = require("./dto/force-change-password.dto");
const authenticated_decorator_1 = require("../common/decorators/authenticated.decorator");
let AuthController = class AuthController {
    constructor(authHandler, authService, prisma) {
        this.authHandler = authHandler;
        this.authService = authService;
        this.prisma = prisma;
    }
    async login(loginDto, res) {
        return this.authHandler.handleLogin(loginDto, res);
    }
    async logout(req, res) {
        try {
            await this.authHandler.handleLogout(req, res);
        }
        catch (error) {
        }
        res.clearCookie('auth_token', { httpOnly: true, secure: true, sameSite: 'strict', path: '/' });
        return { message: 'Sesión cerrada' };
    }
    async me(req, res) {
        return this.authHandler.handleMe(req, res);
    }
    async changePassword(req, dto) {
        const user = req.user;
        return this.authService.changePassword(user.sub, dto);
    }
    async forceChangePassword(req, dto) {
        const user = req.user;
        return this.authService.forceChangePassword(user.sub, dto.newPassword);
    }
    async keepAlive(req) {
        const user = req.user;
        if (!user?.sub)
            return { ok: false };
        const configuredMinutes = Number(process.env.SESSION_TIMEOUT_MINUTES ?? '') || 15;
        try {
            await this.prisma.person.update({ where: { id: Number(user.sub) }, data: { lastActivityAt: new Date() } });
        }
        catch (e) {
            return { ok: false };
        }
        return { ok: true, timeoutMinutes: configuredMinutes };
    }
    async session(req) {
        const user = req.user;
        const configuredMinutes = Number(process.env.SESSION_TIMEOUT_MINUTES ?? '') || 15;
        try {
            const person = await this.prisma.person.findUnique({ where: { id: Number(user.sub) } });
            let remainingSeconds = null;
            if (person?.lastActivityAt) {
                const last = new Date(person.lastActivityAt).getTime();
                const now = Date.now();
                const maxMs = configuredMinutes * 60 * 1000;
                const elapsed = now - last;
                remainingSeconds = Math.max(0, Math.floor((maxMs - elapsed) / 1000));
            }
            else {
                remainingSeconds = configuredMinutes * 60;
            }
            return { remainingSeconds, lastActivityAt: person?.lastActivityAt, timeoutMinutes: configuredMinutes };
        }
        catch (e) {
            if (user?.exp) {
                const nowSec = Math.floor(Date.now() / 1000);
                const remainingSeconds = Math.max(0, Number(user.exp) - nowSec);
                return { remainingSeconds, timeoutMinutes: null, tokenExp: user.exp };
            }
            return { remainingSeconds: configuredMinutes * 60, timeoutMinutes: configuredMinutes };
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Login de usuario' }),
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDto }),
    (0, swagger_1.ApiOkResponse)({ description: 'Login exitoso' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Credenciales inválidas' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, authenticated_decorator_1.Authenticated)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('change-password'),
    (0, swagger_1.ApiOperation)({ summary: 'Cambiar contraseña estando logueado' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_password_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('force-change-password'),
    (0, swagger_1.ApiOperation)({ summary: 'Cambio de contraseña tras login con contraseña temporal' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, force_change_password_dto_1.ForceChangePasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forceChangePassword", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('keepalive'),
    (0, swagger_1.ApiOperation)({ summary: 'Keepalive: actualiza lastActivityAt sin regenerar token' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "keepAlive", null);
__decorate([
    (0, common_1.Get)('session'),
    (0, authenticated_decorator_1.Authenticated)(),
    (0, common_1.Header)('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0'),
    (0, common_1.Header)('Pragma', 'no-cache'),
    (0, swagger_1.ApiOperation)({ summary: 'Estado de sesión: tiempo restante antes de expirar' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "session", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_handler_service_1.AuthHandlerService, auth_service_1.AuthService, prisma_service_1.PrismaService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map