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
exports.MousePadController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const mouse_pad_service_1 = require("./mouse-pad.service");
const create_mouse_pad_dto_1 = require("./dto/create-mouse-pad.dto");
const update_mouse_pad_dto_1 = require("./dto/update-mouse-pad.dto");
let MousePadController = class MousePadController {
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    findAll() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    remove(id) {
        return this.service.remove(id);
    }
};
exports.MousePadController = MousePadController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo mouse pad' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_mouse_pad_dto_1.CreateMousePadDto]),
    __metadata("design:returntype", void 0)
], MousePadController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los mouse pad' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MousePadController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener mouse pad por ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MousePadController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar mouse pad' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_mouse_pad_dto_1.UpdateMousePadDto]),
    __metadata("design:returntype", void 0)
], MousePadController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar mouse pad' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MousePadController.prototype, "remove", null);
exports.MousePadController = MousePadController = __decorate([
    (0, swagger_1.ApiTags)('mouse-pad'),
    (0, common_1.Controller)('mouse-pad'),
    __metadata("design:paramtypes", [mouse_pad_service_1.MousePadService])
], MousePadController);
//# sourceMappingURL=mouse-pad.controller.js.map