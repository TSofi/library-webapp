import { GetBookDto } from '../DTO-s/bookDTO';

export class BooksPageDto {
  books!: GetBookDto[];
  currentPage!: number;
  totalPages!: number;
  totalItems!: number;
  hasMore!: boolean;

  constructor(
    books: GetBookDto[],
    currentPage: number,
    totalPages: number,
    totalItems: number,
    hasMore: boolean,
  ) {
    this.books = books;
    this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
    this.hasMore = hasMore;
  }
}

export {};
