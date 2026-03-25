"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticated = Authenticated;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
function Authenticated() {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard));
}
//# sourceMappingURL=authenticated.decorator.js.map