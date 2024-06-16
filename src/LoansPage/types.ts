// types.ts

export interface ClientResponse<T> {
  success: boolean;
  data: T | null;
  statusCode: number;
}

export {};
