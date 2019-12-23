import { Module, HttpModule } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  controllers: [NewsController],
  imports: [HttpModule],
  providers: [NewsService],
})
export class NewsModule {}
