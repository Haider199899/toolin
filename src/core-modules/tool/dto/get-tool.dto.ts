import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/shared/dtos/pagination-dto';

export class GetToolDTO extends PaginationDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name: string = null;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  category: string = null;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  lat: number = null;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  lng: number = null;
}
