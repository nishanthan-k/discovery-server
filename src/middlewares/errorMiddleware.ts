import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ApiResponse } from "../global/utils/ApiResponse";
import { ResponseCode } from "../global/constants/enums/responseEnums";
import { formatZodErrors } from "../global/utils/formatZodErrors";

export const errorMiddleware = (
  err: any, 
  req: Request, 
  res: Response, 
  next: NextFunction
): Response<any, Record<string, any>> => {
    if (err instanceof ZodError) {
      return ApiResponse.send(res, ResponseCode.BAD_REQUEST, "Validation error", null, formatZodErrors(err));
    }

    return ApiResponse.send(res, ResponseCode.INTERNAL_SERVER_ERROR, err.message || "Internal Server Error");
};
