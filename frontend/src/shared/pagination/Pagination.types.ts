export type IPagination = {
  totalItems: number;
  pageSize?: number;
  onChange: (offset: number, limit: number) => void;
};
