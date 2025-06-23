import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpMetricsInterceptor } from '../todo/customMetrics/httpMetrics.interceptor';
import { TodoCounterInterceptor } from '../todo/customMetrics/todo-counter.interceptor';

export const globalInterceptors = [
  {
    provide: APP_INTERCEPTOR,
    useClass: HttpMetricsInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: TodoCounterInterceptor,
  },
];
