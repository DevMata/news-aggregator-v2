import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { ValidateAccessGuard } from './guards/validate-access.guard';
import { Observable } from 'rxjs';
import { New } from './interfaces/New.interface';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @UseGuards(ValidateAccessGuard)
  findAll(@Query('q') q: string, @Query('source') source: string): Observable<New[]> {
    return this.newsService.switchSourceSearch(q, source);
  }
}
