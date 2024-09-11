import { PaginationDto } from 'src/shared/dtos/pagination-dto';
export declare class GetToolDTO extends PaginationDto {
    name: string;
    category: string;
    lat: number;
    lng: number;
}
