"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminOnly = AdminOnly;
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../guards/roles.guard");
const roles_decorator_1 = require("./roles.decorator");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
function AdminOnly() {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)('Administrador', 'Admin', 'admin'));
}
//# sourceMappingURL=admin-only.decorator.js.map