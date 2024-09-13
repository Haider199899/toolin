"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModule = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("./booking.service");
const booking_controller_1 = require("./booking.controller");
const stripe_service_1 = require("../../shared/stripe/stripe-service");
const user_service_1 = require("../user/user.service");
const hashing_1 = require("../../shared/bcrypt/hashing");
const auth_service_1 = require("../auth/auth.service");
const tool_service_1 = require("../tool/tool.service");
let BookingModule = class BookingModule {
};
exports.BookingModule = BookingModule;
exports.BookingModule = BookingModule = __decorate([
    (0, common_1.Module)({
        providers: [booking_service_1.BookingService, stripe_service_1.StripePaymentService, user_service_1.UserService, hashing_1.HasingService, auth_service_1.AuthService, tool_service_1.ToolService],
        controllers: [booking_controller_1.BookingController]
    })
], BookingModule);
//# sourceMappingURL=booking.module.js.map