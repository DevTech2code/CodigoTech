"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rj45ConnectorModule = void 0;
const common_1 = require("@nestjs/common");
const rj45_connector_controller_1 = require("./rj45-connector.controller");
const rj45_connector_service_1 = require("./rj45-connector.service");
let Rj45ConnectorModule = class Rj45ConnectorModule {
};
exports.Rj45ConnectorModule = Rj45ConnectorModule;
exports.Rj45ConnectorModule = Rj45ConnectorModule = __decorate([
    (0, common_1.Module)({
        controllers: [rj45_connector_controller_1.Rj45ConnectorController],
        providers: [rj45_connector_service_1.Rj45ConnectorService]
    })
], Rj45ConnectorModule);
//# sourceMappingURL=rj45-connector.module.js.map