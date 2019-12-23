import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ValidateSearchMiddleware } from './news/middleware/validate-search.middleware';
import { ValidateSourceParamMiddleware } from './news/middleware/validate-source-param.middleware';
import { ValidateJsonMiddleware } from './login/middleware/validate-json.middleware';
import { ConfigModule } from '@nestjs/config';
import { NewsModule } from './news/news.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), NewsModule, LoginModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ValidateSearchMiddleware, ValidateSourceParamMiddleware).forRoutes('news');
    consumer.apply(ValidateJsonMiddleware).forRoutes('login');
  }
}
