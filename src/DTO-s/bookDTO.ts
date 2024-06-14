export class GetBookDto {
  id!: number;
  isbn!: string;
  title!: string;
  author!: string;
  publisher!: string;
  publicationYear!: number;
  available!: boolean;

  constructor(
    id: number,
    isbn: string,
    title: string,
    author: string,
    publisher: string,
    publicationYear: number,
    available: boolean,
  ) {
    this.id = id;
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.publicationYear = publicationYear;
    this.available = available;
  }
}

export class BooksPageDto {
  books!: GetBookDto[];
  currentPage!: number;
  totalPages!: number;
  totalItems!: number;
  hasMore!: boolean;
}

export class AddBookResponseDto {
  id!: number;
  copies!: number;

  constructor(id: number, copies: number) {
    this.id = id;
    this.copies = copies;
  }
}

export {};
