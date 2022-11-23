export enum SortPropertyEnum {
  RAITING_DESC = 'rating',
  RAITING_ASC = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
}
export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  pageCount: number;
  openSort: boolean;
  sort: Sort;
}
