"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateKeyboardDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_keyboard_dto_1 = require("./create-keyboard.dto");
class UpdateKeyboardDto extends (0, swagger_1.PartialType)(create_keyboard_dto_1.CreateKeyboardDto) {
}
exports.UpdateKeyboardDto = UpdateKeyboardDto;
//# sourceMappingURL=update-keyboard.dto.js.map