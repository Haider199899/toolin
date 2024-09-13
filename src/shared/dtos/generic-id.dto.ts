import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GenericIdDTO {
  @ApiProperty({
    description: 'ID of resource',
    required: true,
  })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  id: string;
}
