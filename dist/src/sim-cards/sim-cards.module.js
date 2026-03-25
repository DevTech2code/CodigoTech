"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimCardsModule = void 0;
const common_1 = require("@nestjs/common");
const sim_cards_controller_1 = require("./sim-cards.controller");
const sim_cards_service_1 = require("./sim-cards.service");
let SimCardsModule = class SimCardsModule {
};
exports.SimCardsModule = SimCardsModule;
exports.SimCardsModule = SimCardsModule = __decorate([
    (0, common_1.Module)({
        controllers: [sim_cards_controller_1.SimCardsController],
        providers: [sim_cards_service_1.SimCardsService]
    })
], SimCardsModule);
//# sourceMappingURL=sim-cards.module.js.map