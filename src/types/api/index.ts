import { AxiosError } from 'axios';

export interface GenericResponse {
  status: boolean;
  message: string;
}
export interface ApiResponse<TData> extends GenericResponse {
  status: boolean;
  data: TData;
}

export type APIError = IError | AxiosError;
interface IError extends Error {
  status?: number;
}
