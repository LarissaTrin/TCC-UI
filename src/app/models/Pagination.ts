export class Pagination {
    currentPage!: number;
    itemsPerPage!: number;
    totalItems!: number;
    totalCtotalPagesount!: number;
}

export class PaginatedResult<T> {
    result!: T;
    pagination!: Pagination;
}