import { PaginationDto } from 'src/shared/dtos/pagination-dto';
export declare class GetToolDTO extends PaginationDto {
    name: string;
    category1: string;
    category2: string;
    category3: string;
    lat: number;
    lng: number;
}
