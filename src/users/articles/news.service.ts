import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { New } from './news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveArticleDto } from './articles.dto';

@Injectable()
export class NewsService {
  constructor(@InjectRepository(New) private readonly newsRepository: Repository<New>) {}

  private async searchArticle(saveNewDto: SaveArticleDto): Promise<New> {
    const searchedNew = await this.newsRepository.findOne({ webUrl: saveNewDto.webUrl });

    return searchedNew;
  }

  async saveArticle(saveNewDto: SaveArticleDto): Promise<New> {
    const searcheNew = await this.searchArticle(saveNewDto);
    if (searcheNew) {
      return searcheNew;
    }

    return this.newsRepository.save(saveNewDto);
  }
}
