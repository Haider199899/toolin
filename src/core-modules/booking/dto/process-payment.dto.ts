import { ApiProperty } from '@nestjs/swagger';

class OrderItemDto {
  @ApiProperty({
    description: 'The ID of the order',
    example: '2t7XTc6NZ7r440S9GCAL',
  })
  orderId: string;

  @ApiProperty({
    description: 'The quantity of items ordered',
    example: 2,
  })
  quantity: number;
}

export class ProcessPaymentDto {
  @ApiProperty({
    description: 'Payment method ID from Stripe or another payment provider',
    example: 'pm_1J2Ck3DjhT3khf3Jd0Sa4s7J',
  })
  paymentMethodId: string;

  @ApiProperty({
    description: 'Currency in which the payment is being made',
    example: 'USD',
  })
  currency: string;

  @ApiProperty({
    description: 'Array of orders with order ID and quantity',
    type: [OrderItemDto],
  })
  orders: OrderItemDto[];
}
