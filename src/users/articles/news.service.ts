import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Article } from './articles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveArticleDto } from './articles.dto';

@Injectable()
export class NewsService {
  constructor(@InjectRepository(Article) private readonly newsRepository: Repository<Article>) {}

  private async searchArticle(saveNewDto: SaveArticleDto): Promise<Article> {
    const searchedNew = await this.newsRepository.findOne({ webUrl: saveNewDto.webUrl });

    return searchedNew;
  }

  async saveArticle(saveNewDto: SaveArticleDto): Promise<Article> {
    const searcheNew = await this.searchArticle(saveNewDto);
    if (searcheNew) {
      return searcheNew;
    }

    return this.newsRepository.save(saveNewDto);
  }
}
