import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from "@nestjs/common";

@Catch()
export class RpcToHttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const error = exception?.error || exception;

    const status =
      error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      status: "error",
      message: error?.message || "Internal server error",
      code: error?.code,
    });
  }
}
