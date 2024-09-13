// src/orders/orders.module.ts
import { Module } from '@nestjs/common';
import { OrdersController } from './order.controller';
import { OrdersService } from './order.service';

@Module({
  imports: [],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
