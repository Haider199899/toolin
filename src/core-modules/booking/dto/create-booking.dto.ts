import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsArray, IsOptional, IsNumber } from "class-validator";

export class CreateBookingDto {
  @ApiProperty({
    description: 'Array of order IDs that are part of the booking',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  orderIds: string[];
}

export class PriceBreakdownDto {
  @ApiPropertyOptional({ description: 'Insurance cost', example: 10.00 })
  @IsOptional()
  @IsNumber()
  insurance?: number;

  @ApiPropertyOptional({ description: 'Tax amount', example: 5.00 })
  @IsOptional()
  @IsNumber()
  tax?: number;

  @ApiPropertyOptional({ description: 'Service fee', example: 15.00 })
  @IsOptional()
  @IsNumber()
  service?: number;
}

export class OrderDto {
  @ApiProperty({ description: 'ID of the tool being rented' })
  @IsString()
  toolId: string;

  @ApiProperty({ description: 'Start date of the rental period' })
  @IsString()
  startDate: string;

  @ApiProperty({ description: 'End date of the rental period' })
  @IsString()
  endDate: string;

  @ApiProperty({ description: 'Price breakdown for the order' })
  priceBreakdown: PriceBreakdownDto;
}