import { useLiteState } from '.';

export const usePagination = (pageNum = 1, pageSize = 20) =>
  useLiteState(() => ({
    pageNum,
    pageSize,
  }));
