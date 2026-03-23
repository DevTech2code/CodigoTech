"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStorageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_storage_dto_1 = require("./create-storage.dto");
class UpdateStorageDto extends (0, swagger_1.PartialType)(create_storage_dto_1.CreateStorageDto) {
}
exports.UpdateStorageDto = UpdateStorageDto;
//# sourceMappingURL=update-storage.dto.js.map