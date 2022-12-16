import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

interface Response<T> {
  data: T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const req = context.switchToHttp().getRequest<Request>()
    console.log(`请求参数：${JSON.stringify(req.body)}`)

    return next.handle().pipe(
      map((data) => ({
        code: '00000',
        message: 'OK',
        data
      }))
    )
  }
}
