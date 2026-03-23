"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSimCardDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_sim_card_dto_1 = require("./create-sim-card.dto");
class UpdateSimCardDto extends (0, swagger_1.PartialType)(create_sim_card_dto_1.CreateSimCardDto) {
}
exports.UpdateSimCardDto = UpdateSimCardDto;
//# sourceMappingURL=update-sim-card.dto.js.map