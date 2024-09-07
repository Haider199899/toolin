"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsModule = void 0;
const common_1 = require("@nestjs/common");
const tool_controller_1 = require("../tool/tool.controller");
const tool_service_1 = require("./tool.service");
const auth_service_1 = require("../auth/auth.service");
const user_service_1 = require("../user/user.service");
const hashing_1 = require("../../shared/bcrypt/hashing");
const stripe_service_1 = require("../../shared/stripe/stripe-service");
let ToolsModule = class ToolsModule {
};
exports.ToolsModule = ToolsModule;
exports.ToolsModule = ToolsModule = __decorate([
    (0, common_1.Module)({
        controllers: [tool_controller_1.ToolController],
        providers: [tool_service_1.ToolService, auth_service_1.AuthService, user_service_1.UserService, hashing_1.HasingService, stripe_service_1.StripePaymentService],
    })
], ToolsModule);
//# sourceMappingURL=tool.module.js.map