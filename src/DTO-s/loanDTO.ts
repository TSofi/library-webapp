import { GetBookDto } from './bookDTO';
import { UserDto, GetUserDto } from './userDTO';
export class LoanDto {
  id!: number;
  book!: GetBookDto;
  user!: UserDto;
  dateOfLoan!: string;
  dueDate!: string;
}
export class LoanPageDto {
  loans!: LoanDto[];
  currentPage!: number;
  totalPages!: number;
  totalItems!: number;
  hasMore!: boolean;
}
export class CreateLoanDto {
  userId!: number;
  bookId!: number;
  dueDate!: string;
}
export class CreateLoanResponseDto {
  id!: number;
  bookId!: number;
  userId!: number;
  loanDate!: string;
  dueDate!: string;
}
export class GetLoanDto {
  id!: number;
  book!: GetBookDto;
  user!: GetUserDto;
  dateOfLoan!: string;
  dueDate!: string;
}

export interface CreateLoanDto {
  userId: number;
  bookId: number;
  dueDate: string;
}

export interface CreateLoanResponseDto {
  loanId: number;
  dueDate: string;
}


export {};
