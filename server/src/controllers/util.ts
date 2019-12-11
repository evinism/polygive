import { Response } from 'express';
import { ApiSuccess, ApiError } from '../../shared/workarounds/ApiResponse';
export {RTHandler} from '../types/RestypedHelpers';

export const success = (res?: Response, status = 200) => <T>(successData: T): ApiSuccess<T> => {
  if (res){
    res.status(status);
  }
  return {
    success: true,
    successData,
  }
}

export const error = (res?: Response, status = 500) => (errorData: any): ApiError => {
  if(res){
    res.status(status);
  }
  return {
    success: false,
    errorData,
  }
}
