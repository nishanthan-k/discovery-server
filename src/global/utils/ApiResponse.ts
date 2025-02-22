import { Response } from "express";
import { ResponseStatus, ResponseCode } from "../constants/enums/responseEnums";

export class ApiResponse {
  static send(
    res: Response,
    code: ResponseCode,
    message: string,
    data?: any,
    errors?: any
  ) {
    let status: ResponseStatus;

    if (code >= 200 && code < 400) {
      status = ResponseStatus.SUCCESS;
    } else if (code >= 400 && code < 500) {
      status = ResponseStatus.FAIL;
    } else {
      status = ResponseStatus.ERROR;
    }

    const response: Record<string, any> = { status, message };

    if (data !== undefined && data !== null) {
      response.data = data;
    }

    if (errors !== undefined && errors !== null) {
      response.errors = errors;
    }

    return res.status(code).json(response);
  }
}
