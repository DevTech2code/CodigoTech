"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMouseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_mouse_dto_1 = require("./create-mouse.dto");
class UpdateMouseDto extends (0, swagger_1.PartialType)(create_mouse_dto_1.CreateMouseDto) {
}
exports.UpdateMouseDto = UpdateMouseDto;
//# sourceMappingURL=update-mouse.dto.js.map