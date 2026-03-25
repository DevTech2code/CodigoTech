"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInkDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_ink_dto_1 = require("./create-ink.dto");
class UpdateInkDto extends (0, swagger_1.PartialType)(create_ink_dto_1.CreateInkDto) {
}
exports.UpdateInkDto = UpdateInkDto;
//# sourceMappingURL=update-ink.dto.js.map