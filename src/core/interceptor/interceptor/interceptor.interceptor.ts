import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ApiResponse } from 'src/core/interface';

// Al crear este tipo de interceptores de respuesta tenemos una estructura de consistencia y mantenible, facilita
// la manipulacion y la legibilidad de la misma

@Injectable()
export class InterceptorInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: 'Sucess',
        data,
      })),
    );
  }
}
