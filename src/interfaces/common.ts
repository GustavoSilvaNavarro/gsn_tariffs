export type Nullable<T> = T | null;

export type HeaderRows = {
  id: string;
  name: string;
  align: 'center' | 'left' | 'right' | 'inherit' | 'justify';
};

export type PaginationDetails = { pageStart: number; pageCount: number };
