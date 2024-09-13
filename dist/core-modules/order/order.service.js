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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const firebase_config_1 = require("../../config/firebase-config");
const class_transformer_1 = require("class-transformer");
let OrdersService = class OrdersService {
    constructor() { }
    async createOrder(createOrderDto) {
        const ordersCollection = firebase_config_1.db.collection('orders');
        const createdOrders = [];
        for (const orderDto of createOrderDto) {
            const plainOrderData = (0, class_transformer_1.instanceToPlain)(orderDto);
            const newOrderRef = ordersCollection.doc();
            await newOrderRef.set({
                ...plainOrderData,
                createdOn: new Date(),
                updatedOn: new Date(),
            });
            createdOrders.push({ id: newOrderRef.id, ...plainOrderData });
        }
        return createdOrders;
    }
    async getOrderByUserIdAndOrderId(userId, orderId) {
        const ordersCollection = firebase_config_1.db.collection('orders');
        const orderRef = await ordersCollection.doc(orderId).get();
        if (!orderRef.exists) {
            throw new Error('Order not found');
        }
        const orderData = orderRef.data();
        if (orderData.renterId !== userId) {
            throw new Error('User does not have access to this order');
        }
        return { id: orderId, ...orderData };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], OrdersService);
//# sourceMappingURL=order.service.js.map