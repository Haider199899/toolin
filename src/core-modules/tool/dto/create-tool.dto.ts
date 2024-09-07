import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GeolocDTO {
  @ApiProperty()
  @IsNumber()
  lat: number;

  @ApiProperty()
  @IsNumber()
  lng: number;
}

export class CreateToolDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiProperty({ type: GeolocDTO })
  @IsObject()
  @IsNotEmpty()
  _geoloc: GeolocDTO;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  availableAfter?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  availableBefore?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsBoolean()
  hasInsurance: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  insuranceId?: string;

  @ApiProperty()
  @IsBoolean()
  isAvailable: boolean;

  @ApiProperty()
  @IsBoolean()
  isDeliveryAvailable: boolean;

  @ApiProperty()
  @IsBoolean()
  isOperatorAvailable: boolean;

  @ApiProperty()
  @IsBoolean()
  isOwnerApproved: boolean;

  @ApiProperty()
  @IsBoolean()
  isPublished: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  mainImageIdx?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  marketValue?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  priceDaily?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  priceMonthly?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  priceWeekly?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  streetAddress?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  category1?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  category2?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  category3?: string;
}
