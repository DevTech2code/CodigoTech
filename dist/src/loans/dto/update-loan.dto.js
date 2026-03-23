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
exports.UpdateLoanDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
class UpdateLoanDto {
}
exports.UpdateLoanDto = UpdateLoanDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Fecha de devolución',
        example: '2023-09-30T14:48:00.000Z',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], UpdateLoanDto.prototype, "returnDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: client_1.Condition,
        description: 'Condición al momento de la devolución',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.Condition),
    __metadata("design:type", String)
], UpdateLoanDto.prototype, "returnCondition", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Notas sobre la devolución',
        example: 'El activo se devolvió en buen estado',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLoanDto.prototype, "returnNotes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID de la persona',
        example: 456,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateLoanDto.prototype, "personId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID de la sucursal', example: 789 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateLoanDto.prototype, "branchId", void 0);
//# sourceMappingURL=update-loan.dto.js.map