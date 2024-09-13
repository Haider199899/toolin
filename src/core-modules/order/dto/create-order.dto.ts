import {
  IsString,
  IsBoolean,
  IsNumber,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PriceBreakdownDto {
  @ApiProperty({ description: 'The active price type for the order', example: 'daily' })
  @IsString()
  activePriceType: string;

  @ApiProperty({ description: 'The daily base price', example: 100 })
  @IsNumber()
  dailyBase: number;

  @ApiProperty({ description: 'Insurance cost', example: 15 })
  @IsNumber()
  insurance: number;

  @ApiProperty({ description: 'Length of the rental in days', example: 5,required : true })
  @IsNumber()
  rentalLength: number;

  @ApiProperty({ description: 'Service fee', example: 10 })
  @IsNumber()
  service: number;

  @ApiProperty({ description: 'Tax amount', example: 8 })
  @IsNumber()
  tax: number;

  @ApiProperty({ description: 'Total cost of the order', example: 150 })
  @IsNumber()
  total: number;

  @ApiProperty({ description: 'Total base price before any extra charges', example: 120 })
  @IsNumber()
  totalBase: number;
}

export class TimelineItemDto {
  @ApiProperty({ description: 'Content of the timeline item', example: 'Order placed' })
  @IsString()
  content: string;

  @ApiProperty({ description: 'Origin of the timeline item', example: 'System' })
  @IsString()
  origin: string;

  @ApiProperty({ description: 'Timestamp of the event', example: '2024-09-10T10:00:00Z', required: false })
  @IsOptional()
  timestamp?: Date;

  @ApiProperty({ description: 'Type of the timeline event', example: 'info' })
  @IsString()
  type: string;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'First message in the order communication', example: 'Order initiated' })
  @IsString()
  firstMessage: string;

  @ApiProperty({ description: 'Order origin point', example: 'New York' })
  @IsString()
  from: string;

  @ApiProperty({ description: 'Timestamp from the origin', example: 1628764800 })
  @IsNumber()
  fromTimestamp: number;

  @ApiProperty({ description: 'Indicates if the order is currently active', example: true })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ description: 'Indicates if messaging is enabled for the order', example: true })
  @IsBoolean()
  isMessagingEnabled: boolean;

  @ApiProperty({ description: 'Indicates if the order has been paid', example: false })
  @IsBoolean()
  isPaid: boolean;

  @ApiProperty({ description: 'ID of the order owner', example: 'abc123' })
  @IsString()
  ownerId: string;

  @ApiProperty({ description: 'Price breakdown of the order', type: PriceBreakdownDto })
  @ValidateNested()
  @Type(() => PriceBreakdownDto)
  priceBreakdown: PriceBreakdownDto;

  @ApiProperty({ description: 'ID of the renter', example: 'renter456' })
  @IsString()
  renterId: string;

  @ApiProperty({ description: 'Current status of the order', example: 'pending' })
  @IsString()
  status: string;

  @ApiProperty({ description: 'Timeline of the order events', type: [TimelineItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimelineItemDto)
  timeline: TimelineItemDto[];

  @ApiProperty({ description: 'Last updated timestamp for the timeline', example: '2024-09-10T10:00:00Z', required: false })
  @IsOptional()
  @IsString()
  timelineLastUpdatedOn?: Date;

  @ApiProperty({ description: 'Order destination point', example: 'San Francisco' })
  @IsString()
  to: string;

  @ApiProperty({ description: 'Timestamp to the destination', example: 1628851200 })
  @IsNumber()
  toTimestamp: number;

  @ApiProperty({ description: 'ID of the tool being rented', example: 'tool789' })
  @IsString()
  toolId: string;

  @ApiProperty({ description: 'Name of the tool being rented', example: 'Drill Machine' })
  @IsString()
  toolName: string;

  @ApiProperty({ description: 'Total price of the order', example: 150 })
  @IsNumber()
  totalPrice: number;

  @ApiProperty({ description: 'Unit price of the tool being rented', example: 100 })
  @IsNumber()
  unitPrice: number;
}
