/*
ts not tsx because files that connected to the backend and not react components. 

This code sets up a LibraryClient class that uses Axios for making HTTP requests to a backend API,
handles JWT tokens for authentication, and imports various data transfer 
objects (DTOs) for handling data related to login, books, loans, users, and registration.
*/

import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import Cookies from 'universal-cookie';
import { JwtPayload, jwtDecode } from 'jwt-decode';

import { LoginDto, LoginResponseDto } from '../DTO-s/loginDTO';
import {
  GetBookDto,
  AddBookResponseDto,
  BookFormValues,
} from '../DTO-s/bookDTO';

import {
  CreateLoanDto,
  CreateLoanResponseDto,
  LoanPageDto,
} from '../DTO-s/loanDTO';
import { UserDto } from '../DTO-s/userDTO';
import { RegisterDto, RegisterResponseDto } from '../DTO-s/registerDTO';

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  statusCode: number;
};

interface MyJwtPayload extends JwtPayload {
  role?: string;
}

export class LibraryClient {
  private client: AxiosInstance;
  private cookies = new Cookies();

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8081/api',
    });

    this.client.interceptors.request.use((config) => {
      const token = this.cookies.get('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  public async isAdmin(): Promise<boolean> {
    const role = await this.getUserRole();
    return role === 'ROLE_ADMIN';
  }

  public getUserRole(): string {
    const token = this.cookies.get('token');
    console.log('token', token);
    if (token) {
      try {
        const decoded = jwtDecode<MyJwtPayload>(token);
        if (decoded.role) {
          return decoded.role;
        }
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    }
    return '';
  }

  public async login(
    data: LoginDto,
  ): Promise<ClientResponse<LoginResponseDto | null>> {
    try {
      const response: AxiosResponse<LoginResponseDto> = await this.client.post(
        'auth/login',
        data,
      );

      this.client.defaults.headers.common['Authorization'] =
        `Bearer ${response.data.token}`;
      const decoded = jwtDecode<MyJwtPayload>(response.data.token);

      console.log('decoded', decoded);
      if (decoded.exp) {
        console.log('cookie saved', decoded.exp);
        this.cookies.set('token', response.data.token, {
          expires: new Date(decoded.exp * 1000),
        });
      }

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public signOut(): void {
    this.cookies.remove('token');
    this.client.defaults.headers.common['Authorization'] = '';
  }

  public async register(
    data: RegisterDto,
  ): Promise<ClientResponse<RegisterResponseDto>> {
    try {
      const response: AxiosResponse<RegisterResponseDto> =
        await this.client.post('auth/register', data);

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: {
          uid: '',
          username: '',
          role: '',
        },
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  /*
  public async register(
    data: RegisterDto,
  ): Promise<ClientResponse<RegisterResponseDto | null>> {
    try {
      const response: AxiosResponse<RegisterResponseDto> =
        await this.client.post('auth/register', data);

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  */

  public async getUsers(): Promise<ClientResponse<UserDto[]>> {
    try {
      const response: AxiosResponse<UserDto[]> =
        await this.client.get('user/getAll');
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: [],
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async deleteUser(id: number): Promise<ClientResponse<null>> {
    try {
      const response: AxiosResponse<null> = await this.client.delete(
        `user/delete/${id}`,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getBooks(
    page: number = 0,
    searchTerm: string | null = null,
  ): Promise<ClientResponse<GetBookDto[] | null>> {
    try {
      const response: AxiosResponse<GetBookDto[]> = await this.client.get(
        'addBook/getAll',
        {
          params: {
            page: page,
            size: 8,
            searchTerm: searchTerm,
          },
        },
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
  public async getBookDetails(
    id: number,
  ): Promise<ClientResponse<GetBookDto | null>> {
    try {
      const response: AxiosResponse<GetBookDto> = await this.client.get(
        `addBook/details/${id}`,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async deleteBook(id: number): Promise<ClientResponse<null>> {
    try {
      const response: AxiosResponse<null> = await this.client.delete(
        `addBook/delete/${id}`,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async addBook(
    data: BookFormValues,
  ): Promise<ClientResponse<AddBookResponseDto>> {
    try {
      const response: AxiosResponse<AddBookResponseDto> =
        await this.client.post('/addBook/create', data);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: { id: 0, copies: 0 },
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getLoans(
    page: number = 0,
    userId: number,
  ): Promise<ClientResponse<LoanPageDto | null>> {
    try {
      const response: AxiosResponse<LoanPageDto> = await this.client.get(
        `loans/getAll`,
        {
          params: {
            userId: userId,
            page: page,
            size: 8,
          },
          headers: {
            Accept: 'application/json',
          },
        },
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async takeLoan(
    data: CreateLoanDto,
  ): Promise<ClientResponse<CreateLoanResponseDto | null>> {
    try {
      const response: AxiosResponse<CreateLoanResponseDto> =
        await this.client.post('loans/add', data);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async returnLoan(loanId: number): Promise<ClientResponse<null>> {
    try {
      const response: AxiosResponse<null> = await this.client.put(
        `loans/return/${loanId}`,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async extendLoan(
    loanId: number,
    days: number,
  ): Promise<ClientResponse<null>> {
    try {
      const response: AxiosResponse<null> = await this.client.put(
        `loans/extend/${loanId}?days=${days}`,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getCurrentUser(): Promise<ClientResponse<UserDto | null>> {
    try {
      const response: AxiosResponse<UserDto> =
        await this.client.get('users/me');
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
}

export {};
