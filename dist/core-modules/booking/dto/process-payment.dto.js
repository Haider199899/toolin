"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessPaymentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class OrderItemDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the order',
        example: '2t7XTc6NZ7r440S9GCAL',
    }),
    __metadata("design:type", String)
], OrderItemDto.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The quantity of items ordered',
        example: 2,
    }),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "quantity", void 0);
class ProcessPaymentDto {
}
exports.ProcessPaymentDto = ProcessPaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Payment method ID from Stripe or another payment provider',
        example: 'pm_1J2Ck3DjhT3khf3Jd0Sa4s7J',
    }),
    __metadata("design:type", String)
], ProcessPaymentDto.prototype, "paymentMethodId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Currency in which the payment is being made',
        example: 'USD',
    }),
    __metadata("design:type", String)
], ProcessPaymentDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of orders with order ID and quantity',
        type: [OrderItemDto],
    }),
    __metadata("design:type", Array)
], ProcessPaymentDto.prototype, "orders", void 0);
//# sourceMappingURL=process-payment.dto.js.map