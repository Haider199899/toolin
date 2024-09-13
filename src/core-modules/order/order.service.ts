// src/orders/orders.service.ts
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { db } from '../../config/firebase-config';
import { instanceToPlain } from 'class-transformer';
@Injectable()
export class OrdersService {
  constructor() {}

  async createOrder(createOrderDto: CreateOrderDto[]) {
    const ordersCollection = db.collection('orders');
    const createdOrders = [];

    // Process each order DTO in the array
    for (const orderDto of createOrderDto) {
      // Convert the DTO instance to a plain object
      const plainOrderData = instanceToPlain(orderDto);
      const newOrderRef = ordersCollection.doc();

      // Save the order in Firestore
      await newOrderRef.set({
        ...plainOrderData,
        createdOn: new Date(),
        updatedOn: new Date(),
      });

      // Collect the created order data (id and the order data)
      createdOrders.push({ id: newOrderRef.id, ...plainOrderData });
    }

    // Return the array of created orders with their IDs
    return createdOrders;
  }

  async getOrderByUserIdAndOrderId(userId: string, orderId: string) {
    const ordersCollection = db.collection('orders');
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
}
