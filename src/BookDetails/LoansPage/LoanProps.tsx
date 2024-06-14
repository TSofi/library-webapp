export interface LoanProps {
  id: number;
  userId: number;
  book: BookProps;
  dueDate: string; // Adjust type as needed, assuming it's a string for simplicity
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
  // Add more fields as needed
}

export interface GetBookDto {
  id: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publicationYear: number;
  isAvailable: boolean;
  // Add more fields as needed
}
