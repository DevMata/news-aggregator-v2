import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersToArticles } from './userstoarticles.entity';
import { UsersToArticlesService } from './userstoarticles.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersToArticles])],
  providers: [UsersToArticlesService],
  exports: [UsersToArticlesService],
})
export class UsersToNewsModule {}
