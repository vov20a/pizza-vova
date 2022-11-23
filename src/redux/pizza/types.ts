import { Sort } from "../filter/types";

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
  }
export  type Pizza = {
    id: string;
    price: number;
    title: string;
    imageUrl: string;
    sizes: number[];
    types: string[];
    rating: number;
  };
  export type FetchPizzasArgs = {
    category: string;
    sort: Sort;
    searchInCategory: string;
    limit: number;
    currentPage: number;
  };