import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersToNews } from './userstonews.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersToNewsService {
  constructor(@InjectRepository(UsersToNews) private readonly usersToNewsRepository: Repository<UsersToNews>) {}
}
