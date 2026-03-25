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
exports.BulkCreateAssetDto = exports.BulkCreateAssetItemDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const create_asset_dto_1 = require("./create-asset.dto");
class BulkCreateAssetItemDto {
}
exports.BulkCreateAssetItemDto = BulkCreateAssetItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Código único del activo', example: 'A12345' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkCreateAssetItemDto.prototype, "assetCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tipo de activo', example: 'Laptop' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BulkCreateAssetItemDto.prototype, "assetType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Número de serie del activo', example: 'SN1234567890' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkCreateAssetItemDto.prototype, "serialNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Marca del activo', example: 'Dell' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkCreateAssetItemDto.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Modelo del activo', example: 'XPS 13' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkCreateAssetItemDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Precio de compra del activo', example: 499.99 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BulkCreateAssetItemDto.prototype, "purchasePrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: create_asset_dto_1.AssetStatus, description: 'Estado del activo' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(create_asset_dto_1.AssetStatus),
    __metadata("design:type", String)
], BulkCreateAssetItemDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID de la sucursal asociada', example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], BulkCreateAssetItemDto.prototype, "branchId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Fecha de compra', example: '2024-01-15' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BulkCreateAssetItemDto.prototype, "purchaseDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Fecha de entrega', example: '2024-01-20' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BulkCreateAssetItemDto.prototype, "deliveryDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Fecha de recepción', example: '2024-01-25' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BulkCreateAssetItemDto.prototype, "receivedDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Notas adicionales', example: 'Activo en buen estado' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkCreateAssetItemDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Atributos JSON del activo', example: { cpu: 'Intel i7', ram: '16GB' } }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], BulkCreateAssetItemDto.prototype, "attributesJson", void 0);
class BulkCreateAssetDto {
}
exports.BulkCreateAssetDto = BulkCreateAssetDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cantidad de dispositivos a crear', example: 5 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], BulkCreateAssetDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: BulkCreateAssetItemDto, description: 'Plantilla con los datos base para todos los dispositivos' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BulkCreateAssetItemDto),
    __metadata("design:type", BulkCreateAssetItemDto)
], BulkCreateAssetDto.prototype, "template", void 0);
//# sourceMappingURL=bulk-create-asset.dto.js.map