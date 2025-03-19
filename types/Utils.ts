interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
  code: number;
}

interface ErrorResponse {
  error: true;
  message: string;
  name: string;
  code: number;
}

export type { SuccessResponse, ErrorResponse };
