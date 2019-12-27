import { Injectable, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersToNews } from './userstonews.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Article } from '../articles/articles.entity';

@Injectable()
export class UsersToNewsService {
  constructor(@InjectRepository(UsersToNews) private readonly usersToNewsRepository: Repository<UsersToNews>) {}

  searchArticleFromUser(user: User, article: Article): Promise<UsersToNews> {
    return this.usersToNewsRepository.findOne({ user: user, article: article });
  }

  async saveArticleToUser(user: User, article: Article): Promise<UsersToNews> {
    const relation = await this.searchArticleFromUser(user, article);
    if (relation) throw new ConflictException('User already save this article');

    return this.usersToNewsRepository.save({ user, article });
  }
}
