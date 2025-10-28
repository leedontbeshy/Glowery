import { Response } from "express";

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: any;
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = "Success",
  status = 200
) => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  return res.status(status).json(response);
};

export const sendError = (
  res: Response,
  error: any,
  message = "Something went wrong",
  status = 500
) => {
  const response: ApiResponse = {
    success: false,
    message,
    error,
  };
  return res.status(status).json(response);
};
