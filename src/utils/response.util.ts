export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  errors?: string[];
}

export class ResponseUtil {
  static success<T>(message: string, data?: T): ApiResponse<T> {
    return {
      status: 'success',
      message,
      ...(data && { data }),
    };
  }

  static error(message: string, errors?: string[]): ApiResponse {
    return {
      status: 'error',
      message,
      ...(errors && { errors }),
    };
  }
}