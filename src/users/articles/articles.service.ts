import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Article } from './articles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveArticleDto } from './articles.dto';

@Injectable()
export class ArticlesService {
  constructor(@InjectRepository(Article) private readonly articlesRepository: Repository<Article>) {}

  private async searchArticle(saveNewDto: SaveArticleDto): Promise<Article> {
    const searchedNew = await this.articlesRepository.findOne({ webUrl: saveNewDto.webUrl });

    return searchedNew;
  }

  async saveArticle(saveArticleDto: SaveArticleDto): Promise<Article> {
    const searcheNew = await this.searchArticle(saveArticleDto);
    if (searcheNew) {
      return searcheNew;
    }

    return this.articlesRepository.save(saveArticleDto);
  }
}
