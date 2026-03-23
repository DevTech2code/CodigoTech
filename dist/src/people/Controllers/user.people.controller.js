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
exports.UserPeopleController = void 0;
const common_1 = require("@nestjs/common");
const people_service_1 = require("../people.service");
const swagger_1 = require("@nestjs/swagger");
const user_only_decorator_1 = require("../../common/decorators/user-only.decorator");
let UserPeopleController = class UserPeopleController {
    constructor(peopleService) {
        this.peopleService = peopleService;
    }
    async getCurrentUser(req) {
        const user = req.user;
        if (!user?.sub) {
            throw new common_1.NotFoundException('ID de usuario no encontrado en el token');
        }
        const person = await this.peopleService.findUserDetails(user.sub);
        if (!person) {
            throw new common_1.NotFoundException(`Usuario con ID ${user.sub} no encontrado`);
        }
        return person;
    }
};
exports.UserPeopleController = UserPeopleController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener datos del usuario autenticado' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Datos del usuario obtenidos con éxito' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'No autorizado' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserPeopleController.prototype, "getCurrentUser", null);
exports.UserPeopleController = UserPeopleController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, user_only_decorator_1.UserOnly)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('/user'),
    __metadata("design:paramtypes", [people_service_1.PeopleService])
], UserPeopleController);
//# sourceMappingURL=user.people.controller.js.map