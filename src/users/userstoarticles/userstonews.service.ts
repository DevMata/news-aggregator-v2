import { Injectable, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersToArticles } from './userstoarticles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Article } from '../articles/articles.entity';

@Injectable()
export class UsersToNewsService {
  constructor(@InjectRepository(UsersToArticles) private readonly usersToNewsRepository: Repository<UsersToArticles>) {}

  searchArticleFromUser(user: User, article: Article): Promise<UsersToArticles> {
    return this.usersToNewsRepository.findOne({ user: user, article: article });
  }

  async saveArticleToUser(user: User, article: Article): Promise<UsersToArticles> {
    const relation = await this.searchArticleFromUser(user, article);
    if (relation) throw new ConflictException('User already save this article');

    return this.usersToNewsRepository.save({ user, article });
  }
}
