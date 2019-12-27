import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './articles.entity';
import { NewsService } from './news.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
