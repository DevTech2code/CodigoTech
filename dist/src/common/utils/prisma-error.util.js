"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePrismaError = handlePrismaError;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
function handlePrismaError(error, entity = 'Recurso', id) {
    console.error('[handlePrismaError] Error:', error?.code, error?.message);
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2025':
                throw new common_1.NotFoundException(`${entity} con ID ${id} no encontrado`);
            case 'P2002':
                throw new common_1.BadRequestException(`${entity} duplicado`);
            case 'P2003':
                throw new common_1.BadRequestException(`Error de referencia: el registro relacionado no existe`);
            default:
                throw new common_1.BadRequestException(`Error en la solicitud (código: ${error.code})`);
        }
    }
    if (error instanceof client_1.Prisma.PrismaClientValidationError) {
        throw new common_1.BadRequestException(`Error de validación de Prisma: ${error.message}`);
    }
    if (error instanceof client_1.Prisma.PrismaClientUnknownRequestError) {
        throw new common_1.InternalServerErrorException('Error desconocido de Prisma');
    }
    const msg = error && error.message ? String(error.message) : 'Error interno del servidor';
    throw new common_1.InternalServerErrorException(msg);
}
//# sourceMappingURL=prisma-error.util.js.map