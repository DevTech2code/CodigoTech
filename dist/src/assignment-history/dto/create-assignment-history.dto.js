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
exports.CreateAssignmentHistoryDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
class CreateAssignmentHistoryDto {
}
exports.CreateAssignmentHistoryDto = CreateAssignmentHistoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID del activo asignado', example: 123 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateAssignmentHistoryDto.prototype, "assetId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de la persona a la que se asigna el activo',
        example: 456,
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateAssignmentHistoryDto.prototype, "personId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID de la sucursal', example: 789 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateAssignmentHistoryDto.prototype, "branchId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Fecha de asignación',
        example: '2023-09-15T14:48:00.000Z',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateAssignmentHistoryDto.prototype, "assignmentDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Fecha de devolución',
        example: '2023-09-30T14:48:00.000Z',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateAssignmentHistoryDto.prototype, "returnDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: client_1.Condition,
        description: 'Condición al momento de la entrega',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.Condition),
    __metadata("design:type", String)
], CreateAssignmentHistoryDto.prototype, "deliveryCondition", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: client_1.Condition,
        description: 'Condición al momento de la devolución',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.Condition),
    __metadata("design:type", String)
], CreateAssignmentHistoryDto.prototype, "returnCondition", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Notas sobre la entrega',
        example: 'El activo se entregó con caja original',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAssignmentHistoryDto.prototype, "deliveryNotes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Notas sobre la devolución',
        example: 'El activo presenta ligeros daños',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAssignmentHistoryDto.prototype, "returnNotes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: ['no_generada', 'acta_generada', 'firmada'],
        description: 'Estado del acta de entrega',
        default: 'no_generada',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.ActaStatus),
    __metadata("design:type", String)
], CreateAssignmentHistoryDto.prototype, "actaStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Fecha y hora cuando se firmó el acta de entrega',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateAssignmentHistoryDto.prototype, "actaFirmadaAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: ['no_generada', 'acta_generada', 'firmada'],
        description: 'Estado del acta de recepción',
        default: 'no_generada',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.ActaStatus),
    __metadata("design:type", String)
], CreateAssignmentHistoryDto.prototype, "actaRecepcionStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Fecha y hora cuando se firmó el acta de recepción',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateAssignmentHistoryDto.prototype, "actaRecepcionFirmadaAt", void 0);
//# sourceMappingURL=create-assignment-history.dto.js.map