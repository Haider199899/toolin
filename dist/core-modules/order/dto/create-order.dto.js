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
exports.CreateOrderDto = exports.TimelineItemDto = exports.PriceBreakdownDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class PriceBreakdownDto {
}
exports.PriceBreakdownDto = PriceBreakdownDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The active price type for the order', example: 'daily' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PriceBreakdownDto.prototype, "activePriceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The daily base price', example: 100 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PriceBreakdownDto.prototype, "dailyBase", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Insurance cost', example: 15 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PriceBreakdownDto.prototype, "insurance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Length of the rental in days', example: 5, required: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PriceBreakdownDto.prototype, "rentalLength", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Service fee', example: 10 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PriceBreakdownDto.prototype, "service", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tax amount', example: 8 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PriceBreakdownDto.prototype, "tax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total cost of the order', example: 150 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PriceBreakdownDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total base price before any extra charges', example: 120 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PriceBreakdownDto.prototype, "totalBase", void 0);
class TimelineItemDto {
}
exports.TimelineItemDto = TimelineItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Content of the timeline item', example: 'Order placed' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TimelineItemDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Origin of the timeline item', example: 'System' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TimelineItemDto.prototype, "origin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Timestamp of the event', example: '2024-09-10T10:00:00Z', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], TimelineItemDto.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type of the timeline event', example: 'info' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TimelineItemDto.prototype, "type", void 0);
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'First message in the order communication', example: 'Order initiated' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "firstMessage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Order origin point', example: 'New York' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Timestamp from the origin', example: 1628764800 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "fromTimestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indicates if the order is currently active', example: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateOrderDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indicates if messaging is enabled for the order', example: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateOrderDto.prototype, "isMessagingEnabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indicates if the order has been paid', example: false }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateOrderDto.prototype, "isPaid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the order owner', example: 'abc123' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "ownerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Price breakdown of the order', type: PriceBreakdownDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PriceBreakdownDto),
    __metadata("design:type", PriceBreakdownDto)
], CreateOrderDto.prototype, "priceBreakdown", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the renter', example: 'renter456' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "renterId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Current status of the order', example: 'pending' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Timeline of the order events', type: [TimelineItemDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TimelineItemDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "timeline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last updated timestamp for the timeline', example: '2024-09-10T10:00:00Z', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Date)
], CreateOrderDto.prototype, "timelineLastUpdatedOn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Order destination point', example: 'San Francisco' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Timestamp to the destination', example: 1628851200 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "toTimestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the tool being rented', example: 'tool789' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "toolId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the tool being rented', example: 'Drill Machine' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "toolName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total price of the order', example: 150 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "totalPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unit price of the tool being rented', example: 100 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "unitPrice", void 0);
//# sourceMappingURL=create-order.dto.js.map