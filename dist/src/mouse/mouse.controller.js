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
exports.MouseController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const mouse_service_1 = require("./mouse.service");
const create_mouse_dto_1 = require("./dto/create-mouse.dto");
const update_mouse_dto_1 = require("./dto/update-mouse.dto");
let MouseController = class MouseController {
    constructor(mouseService) {
        this.mouseService = mouseService;
    }
    create(createMouseDto) {
        return this.mouseService.create(createMouseDto);
    }
    findAll() {
        return this.mouseService.findAll();
    }
    findOne(id) {
        return this.mouseService.findOne(id);
    }
    update(id, updateMouseDto) {
        return this.mouseService.update(id, updateMouseDto);
    }
    remove(id) {
        return this.mouseService.remove(id);
    }
};
exports.MouseController = MouseController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo mouse' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_mouse_dto_1.CreateMouseDto]),
    __metadata("design:returntype", void 0)
], MouseController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los mouse' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MouseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un mouse por ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MouseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un mouse' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_mouse_dto_1.UpdateMouseDto]),
    __metadata("design:returntype", void 0)
], MouseController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un mouse' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MouseController.prototype, "remove", null);
exports.MouseController = MouseController = __decorate([
    (0, swagger_1.ApiTags)('mouse'),
    (0, common_1.Controller)('mouse'),
    __metadata("design:paramtypes", [mouse_service_1.MouseService])
], MouseController);
//# sourceMappingURL=mouse.controller.js.map