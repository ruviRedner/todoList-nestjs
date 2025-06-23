import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TodoCounterInterceptor implements NestInterceptor {
  constructor(
    @InjectMetric('todos-created-total')
    private readonly counter: Counter,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const isCreateTodoRequest =
      request.method === 'POST' && request.route?.path?.includes('/todos');
    return next.handle().pipe(
      tap(() => {
        if (isCreateTodoRequest) this.counter.inc();
      }),
    );
  }
}
