// src/orders/orders.controller.ts
import { Body, Controller, Param, Post } from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBody, ApiTags } from "@nestjs/swagger";

@ApiTags('order')
@Controller('order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('create')
  @ApiBody({ type: [CreateOrderDto] })
  async createOrder(@Body() createOrderDto: CreateOrderDto[]) {
    return this.ordersService.createOrder(createOrderDto);
  }

  //@Get(':userId/:orderId')
  async getOrderByUserIdAndOrderId(
    @Param('userId') userId: string,
    @Param('orderId') orderId: string,
  ) {
    return this.ordersService.getOrderByUserIdAndOrderId(userId, orderId);
  }
}
