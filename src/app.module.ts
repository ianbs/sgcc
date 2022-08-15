import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { PermissoesGuard } from './decorators/permissoes.guard';
import { ExceptionHttp } from './handlers/exceptionhttp.filter';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionHttp,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: PermissoesGuard,
    },
  ],
})
export class AppModule {}
