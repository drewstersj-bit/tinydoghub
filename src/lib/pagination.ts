export interface PaginationConfig {
  pageSize: number;
  currentPage: number;
}

export interface PaginatedResult<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function paginate<T>(items: T[], config: PaginationConfig): PaginatedResult<T> {
  const { pageSize, currentPage } = config;
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.max(1, Math.min(currentPage, totalPages));
  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;

  return {
    items: items.slice(start, end),
    totalItems,
    totalPages,
    currentPage: safePage,
    hasNextPage: safePage < totalPages,
    hasPreviousPage: safePage > 1,
  };
}
