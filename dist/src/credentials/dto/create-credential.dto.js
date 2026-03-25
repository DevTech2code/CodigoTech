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
exports.CreateCredentialDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class CreateCredentialDto {
}
exports.CreateCredentialDto = CreateCredentialDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de la persona a la que pertenece esta credencial',
        example: 42,
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateCredentialDto.prototype, "personId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre de usuario / email para sistemas que lo requieren',
        example: 'johndoe@empresa.com',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((o) => o.system !== client_1.SystemType.tefl),
    (0, class_validator_1.IsNotEmpty)({ message: 'El usuario es obligatorio para este sistema' }),
    __metadata("design:type", String)
], CreateCredentialDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contraseña para sistemas que lo requieren',
        example: 'secureP@ss123',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((o) => o.system !== client_1.SystemType.tefl),
    (0, class_validator_1.IsNotEmpty)({ message: 'La contraseña es obligatoria para este sistema' }),
    __metadata("design:type", String)
], CreateCredentialDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sistema al que pertenece esta credencial',
        enum: client_1.SystemType,
        example: client_1.SystemType.crm,
    }),
    (0, class_validator_1.IsEnum)(client_1.SystemType),
    __metadata("design:type", String)
], CreateCredentialDto.prototype, "system", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Número telefónico (principalmente para TEFL)',
        example: '+593991234567 o 0962598491',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((o) => o.system === client_1.SystemType.tefl),
    (0, class_validator_1.IsNotEmpty)({ message: 'El número telefónico es obligatorio para TEFL' }),
    (0, class_validator_1.Matches)(/^(?:\+?593|0)[2-9][0-9]{7,8}(?:\s*\/\s*(?:\+?593|0)[2-9][0-9]{7,8})*$/, {
        message: 'Formato de teléfono inválido. Usa formatos válidos ecuatorianos (ej: 0962598491, +593962598491, 022345678). Puedes agregar varios separados por " / "',
    }),
    __metadata("design:type", String)
], CreateCredentialDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Notas adicionales sobre la credencial',
        example: 'Esta cuenta tiene permisos de administrador.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCredentialDto.prototype, "notes", void 0);
//# sourceMappingURL=create-credential.dto.js.map