import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HashHelper } from 'src/common/hash.helper';
import { NewsModule } from './articles/news.module';
import { UsersToNewsModule } from './userstoarticles/userstonews.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), NewsModule, UsersToNewsModule],
  providers: [UsersService, HashHelper],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
