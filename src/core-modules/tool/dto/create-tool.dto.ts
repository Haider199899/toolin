import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @IsNotEmpty()
  @IsArray()
  images: string[]

  @ApiProperty()
  @IsString()
  @IsOptional()
  category: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  condition: string = null

  @ApiProperty()
  @IsString()
  @IsOptional()
  marketValue: string = null
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  priceDaily: string = null

  @ApiProperty()
  @IsString()
  @IsOptional()
  priceMonthly: string = null

  @ApiProperty()
  @IsString()
  @IsOptional()
  priceWeekly: string = null
}
