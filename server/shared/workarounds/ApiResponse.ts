// This is a nasty workaround for the fact that ResTyped is
// so bad at error handling. This basically reimplements http
// status codes in user space.

export interface ApiError {
  success: false
  errorData: any;
}

export interface ApiSuccess<T> {
  success: true,
  successData: T,
}

type ApiResponse<T> = ApiSuccess<T> | ApiError;
export default ApiResponse;
