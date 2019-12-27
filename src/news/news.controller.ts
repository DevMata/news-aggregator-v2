import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { Observable } from 'rxjs';
import { New } from './interfaces/New.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Query('q') q: string, @Query('source') source: string): Observable<New[]> {
    return this.newsService.switchSourceSearch(q, source);
  }
}
