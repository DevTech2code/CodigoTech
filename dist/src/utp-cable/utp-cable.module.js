"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtpCableModule = void 0;
const common_1 = require("@nestjs/common");
const utp_cable_controller_1 = require("./utp-cable.controller");
const utp_cable_service_1 = require("./utp-cable.service");
const prisma_service_1 = require("../prisma/prisma.service");
let UtpCableModule = class UtpCableModule {
};
exports.UtpCableModule = UtpCableModule;
exports.UtpCableModule = UtpCableModule = __decorate([
    (0, common_1.Module)({
        controllers: [utp_cable_controller_1.UtpCableController],
        providers: [utp_cable_service_1.UtpCableService, prisma_service_1.PrismaService],
    })
], UtpCableModule);
//# sourceMappingURL=utp-cable.module.js.map