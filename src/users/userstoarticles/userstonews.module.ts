import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersToArticles } from './userstoarticles.entity';
import { UsersToNewsService } from './userstonews.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersToArticles])],
  providers: [UsersToNewsService],
  exports: [UsersToNewsService],
})
export class UsersToNewsModule {}
