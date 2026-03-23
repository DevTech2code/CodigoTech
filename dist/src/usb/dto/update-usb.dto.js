"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUsbDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_usb_dto_1 = require("./create-usb.dto");
class UpdateUsbDto extends (0, swagger_1.PartialType)(create_usb_dto_1.CreateUsbDto) {
}
exports.UpdateUsbDto = UpdateUsbDto;
//# sourceMappingURL=update-usb.dto.js.map