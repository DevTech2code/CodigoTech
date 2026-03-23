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
exports.CreateLoanDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
class CreateLoanDto {
}
exports.CreateLoanDto = CreateLoanDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID del activo en préstamo', example: 123 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateLoanDto.prototype, "assetId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de la persona a la que se presta el activo',
        example: 456,
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateLoanDto.prototype, "personId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID de la sucursal', example: 789 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateLoanDto.prototype, "branchId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número de días del préstamo',
        example: 7,
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateLoanDto.prototype, "loanDays", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Fecha de préstamo',
        example: '2023-09-15T14:48:00.000Z',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateLoanDto.prototype, "loanDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: client_1.Condition,
        description: 'Condición al momento del préstamo',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.Condition),
    __metadata("design:type", String)
], CreateLoanDto.prototype, "deliveryCondition", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Notas sobre el préstamo',
        example: 'El activo se prestó en condiciones óptimas',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLoanDto.prototype, "deliveryNotes", void 0);
//# sourceMappingURL=create-loan.dto.js.map