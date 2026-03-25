"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOnly = UserOnly;
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../guards/roles.guard");
const roles_decorator_1 = require("./roles.decorator");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
function UserOnly() {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)('Usuario'));
}
//# sourceMappingURL=user-only.decorator.js.map