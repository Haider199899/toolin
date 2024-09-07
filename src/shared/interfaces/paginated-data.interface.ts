export interface IPagination {
    limit: number;
    offset: number;
    count: number;
}

export interface IPaginatedData<T> {
    data: T[];
    pagination: IPagination;
}
