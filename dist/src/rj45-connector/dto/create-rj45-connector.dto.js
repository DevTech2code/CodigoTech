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
exports.CreateRj45ConnectorDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateRj45ConnectorDto {
}
exports.CreateRj45ConnectorDto = CreateRj45ConnectorDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Cat6 UTP',
        description: 'Modelo del conector RJ45',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRj45ConnectorDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 100,
        description: 'Cantidad de conectores disponibles',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateRj45ConnectorDto.prototype, "quantityUnits", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Plástico',
        description: 'Material del conector (opcional)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRj45ConnectorDto.prototype, "material", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'RJ45 Macho',
        description: 'Tipo de conector (opcional)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRj45ConnectorDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 12.5,
        description: 'Precio de compra (opcional)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRj45ConnectorDto.prototype, "purchasePrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2023-10-01',
        description: 'Fecha de compra (opcional, formato ISO)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateRj45ConnectorDto.prototype, "purchaseDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2023-10-15',
        description: 'Fecha de uso (opcional, formato ISO)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateRj45ConnectorDto.prototype, "usageDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Conectores usados para instalación en oficina',
        description: 'Notas adicionales (opcional)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRj45ConnectorDto.prototype, "notes", void 0);
//# sourceMappingURL=create-rj45-connector.dto.js.map