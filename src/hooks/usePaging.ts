import { useEffect, useMemo, useState } from 'react';

export interface UsePagingResult<T> {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  items: T[];
  hasPrevious: boolean;
  hasNext: boolean;
  setPage: (targetPage: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export function usePaging<T>(items: T[], pageSize: number): UsePagingResult<T> {
  const safePageSize = Math.max(1, pageSize);
  const [page, setPage] = useState(1);

  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));

  useEffect(() => {
    setPage((currentPage) => Math.min(currentPage, totalPages));
  }, [totalPages]);

  const pagedItems = useMemo(() => {
    const start = (page - 1) * safePageSize;
    return items.slice(start, start + safePageSize);
  }, [items, page, safePageSize]);

  const goToPage = (targetPage: number): void => {
    setPage(Math.min(Math.max(1, targetPage), totalPages));
  };

  return {
    page,
    pageSize: safePageSize,
    totalPages,
    totalItems,
    items: pagedItems,
    hasPrevious: page > 1,
    hasNext: page < totalPages,
    setPage: goToPage,
    nextPage: () => goToPage(page + 1),
    prevPage: () => goToPage(page - 1),
  };
}
