import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { New } from './news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveNewDto } from './news.dto';

@Injectable()
export class NewsService {
  constructor(@InjectRepository(New) private readonly newsRepository: Repository<New>) {}

  async saveNew(saveNewDto: SaveNewDto): Promise<New> {
    const searcheNew = await this.searchNew(saveNewDto);
    if (searcheNew) {
      return searcheNew;
    }

    return this.newsRepository.save(saveNewDto);
  }

  async searchNew(saveNewDto: SaveNewDto): Promise<New> {
    const searchedNew = await this.newsRepository.findOne({ webUrl: saveNewDto.webUrl });

    return searchedNew;
  }
}
