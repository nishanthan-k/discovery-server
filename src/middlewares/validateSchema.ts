import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { ApiResponse } from "../global/utils/ApiResponse";
import { ResponseCode } from "../global/constants/enums/responseEnums";

// Helper function to format Zod errors (supports nested paths)
const formatZodErrors = (error: ZodError): Record<string, any> => {
  return error.errors.reduce((acc, err) => {
    let current = acc;
    err.path.forEach((key, index) => {
      if (index === err.path.length - 1) {
        current[key] = err.message;
      } else {
        current[key] = current[key] || {};
        current = current[key];
      }
    });
    return acc;
  }, {} as Record<string, any>);
};

// Express middleware for schema validation
export const validateSchema = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        return ApiResponse.send(
          res,
          ResponseCode.BAD_REQUEST,
          "Validation error",
          null,
          formatZodErrors(result.error)
        );
      }

    next();
  };
};
