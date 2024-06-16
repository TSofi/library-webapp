export interface LoanProps {
  id: number;
  userId: number;
  book: BookProps;
  dueDate: string;
}

export interface BookProps {
  id: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publicationYear: number;
  isAvailable: boolean;
}

export interface GetUserDto {
  id: number;
  username: string;
}

export interface GetBookDto {
  id: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publicationYear: number;
  isAvailable: boolean;
}
