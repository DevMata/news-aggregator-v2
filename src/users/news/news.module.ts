import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { New } from './news.entity';
import { NewsService } from './news.service';

@Module({
  imports: [TypeOrmModule.forFeature([New])],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
