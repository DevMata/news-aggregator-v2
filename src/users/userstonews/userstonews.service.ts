import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersToNews } from './userstonews.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveNewToUserDto } from './usersToNews.dto';
import { User } from '../user.entity';
import { New } from '../news/news.entity';

@Injectable()
export class UsersToNewsService {
  constructor(@InjectRepository(UsersToNews) private readonly usersToNewsRepository: Repository<UsersToNews>) {}
}
