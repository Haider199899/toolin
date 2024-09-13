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

  @ApiProperty({
    description: 'The quantity of items ordered',
    example: 2,
  })
  price: number;
}

export class ProcessPaymentDto {
  @ApiProperty({
    description: 'Payment method ID from Stripe or another payment provider',
    example: 'pm_card_visa',
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

  @ApiProperty({
    description: 'Total charges',
  })
  totalAmount: number = null;

}
