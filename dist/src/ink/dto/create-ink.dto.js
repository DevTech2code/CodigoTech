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
exports.CreateInkDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateInkDto {
}
exports.CreateInkDto = CreateInkDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Marca de la tinta',
        example: 'HP',
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateInkDto.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Modelo de la tinta',
        example: '664XL',
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateInkDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Color de la tinta',
        example: 'Negro',
        maxLength: 50,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateInkDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Cantidad de cartuchos disponibles',
        example: 10,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateInkDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Tipo de tinta (por ejemplo: tinta, tóner, gel)',
        example: 'tinta',
        maxLength: 50,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateInkDto.prototype, "inkType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Precio de compra',
        example: 15.5,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateInkDto.prototype, "purchasePrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Fecha de compra en formato ISO',
        example: '2023-08-15T00:00:00.000Z',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInkDto.prototype, "purchaseDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Fecha de primer uso en formato ISO',
        example: '2023-09-01T00:00:00.000Z',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInkDto.prototype, "usageDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Notas adicionales sobre la tinta',
        example: 'Reservado para impresora de recepción.',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInkDto.prototype, "notes", void 0);
//# sourceMappingURL=create-ink.dto.js.map