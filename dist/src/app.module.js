"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const branches_module_1 = require("./branches/branches.module");
const roles_module_1 = require("./roles/roles.module");
const departments_module_1 = require("./departments/departments.module");
const storage_module_1 = require("./storage/storage.module");
const assets_module_1 = require("./assets/assets.module");
const people_module_1 = require("./people/people.module");
const auth_module_1 = require("./auth/auth.module");
const ink_module_1 = require("./ink/ink.module");
const mouse_module_1 = require("./mouse/mouse.module");
const keyboard_module_1 = require("./keyboard/keyboard.module");
const mouse_pad_module_1 = require("./mouse-pad/mouse-pad.module");
const memory_adapter_module_1 = require("./memory-adapter/memory-adapter.module");
const utp_cable_module_1 = require("./utp-cable/utp-cable.module");
const rj45_connector_module_1 = require("./rj45-connector/rj45-connector.module");
const power_strip_module_1 = require("./power-strip/power-strip.module");
const assignment_history_module_1 = require("./assignment-history/assignment-history.module");
const loans_module_1 = require("./loans/loans.module");
const credentials_module_1 = require("./credentials/credentials.module");
const sim_cards_module_1 = require("./sim-cards/sim-cards.module");
const requests_module_1 = require("./requests/requests.module");
const hub_module_1 = require("./hub/hub.module");
const support_module_1 = require("./support/support.module");
const network_adapter_module_1 = require("./network-adapter/network-adapter.module");
const usb_module_1 = require("./usb/usb.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            branches_module_1.BranchesModule,
            roles_module_1.RolesModule,
            departments_module_1.DepartmentsModule,
            storage_module_1.StorageModule,
            assets_module_1.AssetsModule,
            people_module_1.PeopleModule,
            auth_module_1.AuthModule,
            ink_module_1.InkModule,
            mouse_module_1.MouseModule,
            keyboard_module_1.KeyboardModule,
            mouse_pad_module_1.MousePadModule,
            memory_adapter_module_1.MemoryAdapterModule,
            utp_cable_module_1.UtpCableModule,
            rj45_connector_module_1.Rj45ConnectorModule,
            power_strip_module_1.PowerStripModule,
            assignment_history_module_1.AssignmentHistoryModule,
            loans_module_1.LoansModule,
            credentials_module_1.CredentialsModule,
            sim_cards_module_1.SimCardsModule,
            requests_module_1.RequestsModule,
            hub_module_1.HubModule,
            support_module_1.SupportModule,
            network_adapter_module_1.NetworkAdapterModule,
            usb_module_1.UsbModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map