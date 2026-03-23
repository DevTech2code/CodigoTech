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
exports.CreateUtpCableDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateUtpCableDto {
}
exports.CreateUtpCableDto = CreateUtpCableDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Marca del cable UTP',
        example: 'Panduit',
        maxLength: 100,
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateUtpCableDto.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo/categoría del cable UTP',
        example: 'Cat6',
        enum: ['Cat5', 'Cat5e', 'Cat6', 'Cat6a', 'Cat7', 'Cat8'],
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['Cat5', 'Cat5e', 'Cat6', 'Cat6a', 'Cat7', 'Cat8']),
    __metadata("design:type", String)
], CreateUtpCableDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Material del cable',
        example: 'Cobre',
        maxLength: 100,
        required: false,
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateUtpCableDto.prototype, "material", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Longitud del cable en metros',
        example: 305,
        required: false,
        type: Number,
        minimum: 1,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateUtpCableDto.prototype, "lengthMeters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Color del cable',
        example: 'Azul',
        maxLength: 50,
        required: false,
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateUtpCableDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Precio de compra del cable',
        example: 25.5,
        required: false,
        type: Number,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateUtpCableDto.prototype, "purchasePrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha de compra del cable (formato ISO 8601)',
        example: '2024-01-15',
        required: false,
        type: String,
        format: 'date',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUtpCableDto.prototype, "purchaseDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha de inicio de uso del cable (formato ISO 8601)',
        example: '2024-02-01',
        required: false,
        type: String,
        format: 'date',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUtpCableDto.prototype, "usageDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Notas o comentarios adicionales sobre el cable',
        example: 'Cable instalado en el rack principal del segundo piso',
        required: false,
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUtpCableDto.prototype, "notes", void 0);
//# sourceMappingURL=create-utp-cable.dto.js.map