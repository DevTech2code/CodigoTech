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
exports.KeyboardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const keyboard_service_1 = require("./keyboard.service");
const create_keyboard_dto_1 = require("./dto/create-keyboard.dto");
const update_keyboard_dto_1 = require("./dto/update-keyboard.dto");
let KeyboardController = class KeyboardController {
    constructor(keyboardService) {
        this.keyboardService = keyboardService;
    }
    create(createKeyboardDto) {
        return this.keyboardService.create(createKeyboardDto);
    }
    findAll() {
        return this.keyboardService.findAll();
    }
    findOne(id) {
        return this.keyboardService.findOne(id);
    }
    update(id, updateKeyboardDto) {
        return this.keyboardService.update(id, updateKeyboardDto);
    }
    remove(id) {
        return this.keyboardService.remove(id);
    }
};
exports.KeyboardController = KeyboardController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo teclado' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_keyboard_dto_1.CreateKeyboardDto]),
    __metadata("design:returntype", void 0)
], KeyboardController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los teclados' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], KeyboardController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un teclado por ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], KeyboardController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un teclado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_keyboard_dto_1.UpdateKeyboardDto]),
    __metadata("design:returntype", void 0)
], KeyboardController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un teclado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], KeyboardController.prototype, "remove", null);
exports.KeyboardController = KeyboardController = __decorate([
    (0, swagger_1.ApiTags)('keyboard'),
    (0, common_1.Controller)('keyboard'),
    __metadata("design:paramtypes", [keyboard_service_1.KeyboardService])
], KeyboardController);
//# sourceMappingURL=keyboard.controller.js.map