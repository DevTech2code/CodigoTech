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
exports.CreateSimCardDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class CreateSimCardDto {
}
exports.CreateSimCardDto = CreateSimCardDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del activo asociado a la tarjeta SIM',
        example: 101,
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateSimCardDto.prototype, "assetId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre del proveedor de servicios móviles (carrier)',
        example: 'Movistar',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSimCardDto.prototype, "carrier", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número de teléfono asignado a la SIM',
        example: '+1234567890',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSimCardDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de plan asociado a la SIM',
        enum: client_1.SimPlanType,
        example: client_1.SimPlanType.prepago,
    }),
    (0, class_validator_1.IsEnum)(client_1.SimPlanType),
    __metadata("design:type", String)
], CreateSimCardDto.prototype, "planType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Estado actual de la SIM',
        enum: client_1.SimStatus,
        example: client_1.SimStatus.activo,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.SimStatus),
    __metadata("design:type", String)
], CreateSimCardDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Fecha de activación de la SIM (formato ISO)',
        example: '2025-01-01T00:00:00.000Z',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateSimCardDto.prototype, "activationDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Notas adicionales sobre la SIM',
        example: 'SIM utilizada para pruebas internas',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSimCardDto.prototype, "notes", void 0);
//# sourceMappingURL=create-sim-card.dto.js.map