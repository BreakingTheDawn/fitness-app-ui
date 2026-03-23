import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

// 异常响应接口
interface ExceptionResponse {
  message?: string | string[];
  errors?: Record<string, string[]>;
  statusCode?: number;
}

// 统一异常过滤器
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = '服务器内部错误';
    let errors: Record<string, string[]> | null = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const res = exceptionResponse as ExceptionResponse;
        const resMessage = res.message;
        message = Array.isArray(resMessage)
          ? resMessage[0]
          : resMessage || message;
        errors = res.errors || null;
      } else if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      // 开发环境打印错误堆栈
      console.error(exception.stack);
    }

    response.status(status).json({
      code: status,
      success: false,
      message,
      data: null,
      errors,
      timestamp: new Date().toISOString(),
    });
  }
}
