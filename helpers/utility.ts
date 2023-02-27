import { Request, Response } from 'express';



import { FnResponseDataType, } from './types';




export const handleResponse = (res: any, statusCode: number, status: boolean, message: string, data?: any) => {
     return res.status(statusCode).json({
          status,
          message,
          data,
     });
};

export const successResponse = (res: any, message: string = 'Operation successfully', data?: any) => {
     return res.status(200).json({
          status: true,
          message,
          data,
     });
};

export const errorResponse = (res: any, message: string = 'An error occurred', data?: any) => {
     return res.status(400).json({
          status: false,
          message,
          data,
     });
};

export const fnResponse = ({ status, message, data }: FnResponseDataType) => {
     return { status, message, data };
};
