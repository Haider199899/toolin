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
const auth_controller_1 = require("./core-modules/auth/auth.controller");
const auth_module_1 = require("./core-modules/auth/auth.module");
const stripe_service_1 = require("./shared/stripe/stripe-service");
const user_module_1 = require("./core-modules/user/user.module");
const tool_module_1 = require("./core-modules/tool/tool.module");
const dotenv = require("dotenv");
const booking_module_1 = require("./core-modules/booking/booking.module");
const order_module_1 = require("./core-modules/order/order.module");
dotenv.config();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, user_module_1.UserModule, tool_module_1.ToolsModule, booking_module_1.BookingModule, order_module_1.OrdersModule],
        controllers: [auth_controller_1.AuthController, app_controller_1.AppController],
        providers: [stripe_service_1.StripePaymentService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map