import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';
import {
  makeCounterProvider,
  PrometheusModule,
} from '@willsoto/nestjs-prometheus';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpMetricsInterceptor } from './todo/customMetrics/httpMetrics.interceptor';
import { TodoCounterInterceptor } from './todo/customMetrics/todo-counter.interceptor';
import { globalInterceptors } from './interceptors/globalInterceptors';

@Module({
  imports: [
    PrometheusModule.register(),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    TodoModule,
  ],
  providers: [
    ...globalInterceptors,
    makeCounterProvider({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status'],
    }),
    makeCounterProvider({
      name: 'todos_created_total',
      help: 'Total number of todos created',
    }),
  ],
})
export class AppModule {}
