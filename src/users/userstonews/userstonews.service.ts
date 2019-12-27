import { Injectable, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersToNews } from './userstonews.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { New } from '../news/news.entity';

@Injectable()
export class UsersToNewsService {
  constructor(@InjectRepository(UsersToNews) private readonly usersToNewsRepository: Repository<UsersToNews>) {}

  private async searchNewFromUser(user: User, article: New): Promise<UsersToNews> {
    return this.usersToNewsRepository.findOne({ user: user, new: article });
  }

  async saveArticleToUser(user: User, article: New): Promise<UsersToNews> {
    const searchedNewFromUser = await this.searchNewFromUser(user, article);

    if (searchedNewFromUser) {
      throw new ConflictException('Article is already saved for this user');
    }

    return this.usersToNewsRepository.save({ user, article });
  }
}
