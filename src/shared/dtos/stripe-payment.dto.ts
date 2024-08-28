import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDTO {
    @ApiProperty()
    amount: number;

    @ApiProperty()
    currency: string;

    @ApiProperty()
    paymentMethodId?: string;
    
    @ApiProperty()
    customerId?: string;
}