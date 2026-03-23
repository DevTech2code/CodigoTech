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
exports.AssetsUserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const assets_service_1 = require("./assets.service");
let AssetsUserController = class AssetsUserController {
    constructor(assetsService) {
        this.assetsService = assetsService;
    }
    async getUserAssets(req) {
        const personId = Number(req.user.personId ?? req.user.sub);
        return await this.assetsService.findByAssignedPersonId(personId);
    }
    async getAssetTypes() {
        return this.assetsService.findUniqueAssetTypes();
    }
};
exports.AssetsUserController = AssetsUserController;
__decorate([
    (0, common_1.Get)('user/assigned'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener equipos asignados al usuario' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssetsUserController.prototype, "getUserAssets", null);
__decorate([
    (0, common_1.Get)('types'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener tipos de activos disponibles' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssetsUserController.prototype, "getAssetTypes", null);
exports.AssetsUserController = AssetsUserController = __decorate([
    (0, swagger_1.ApiTags)('Assets - User endpoints'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('assets'),
    __metadata("design:paramtypes", [assets_service_1.AssetsService])
], AssetsUserController);
//# sourceMappingURL=assets-user.controller.js.map