import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { New } from './news.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NewsService {
  constructor(@InjectRepository(New) private readonly newsRepository: Repository<New>) {}
}
