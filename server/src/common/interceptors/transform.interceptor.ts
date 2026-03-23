import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// 统一响应格式
export interface Response<T> {
  code: number;
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

// 响应转换拦截器
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  Response<T>
> {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data: T) => ({
        code: 200,
        success: true,
        message: '操作成功',
        data,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
