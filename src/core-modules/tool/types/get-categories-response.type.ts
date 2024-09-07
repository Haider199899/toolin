import {  ApiProperty } from "@nestjs/swagger"

export class CategoryResponseType {
    @ApiProperty()
    category1 : string[]

    @ApiProperty()
    category2 : string[]

    @ApiProperty()
    category3 : string[]
}