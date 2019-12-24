import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ValidateSearchMiddleware } from './news/middleware/validate-search.middleware';
import { ValidateSourceParamMiddleware } from './news/middleware/validate-source-param.middleware';
import { ValidateJsonMiddleware } from './login/middleware/validate-json.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NewsModule } from './news/news.module';
import { LoginModule } from './login/login.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NewsModule,
    LoginModule,
    JwtModule.registerAsync({
      imports: [ConfigService],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres' as 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          database: configService.get('DB_NAME'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASS'),
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true,
        } as TypeOrmModuleOptions;
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule implements NestModule {
  constructor(private readonly connection: Connection) {}

  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ValidateSearchMiddleware, ValidateSourceParamMiddleware).forRoutes('news');
    consumer.apply(ValidateJsonMiddleware).forRoutes('login');
  }
}
