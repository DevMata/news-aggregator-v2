import { Injectable, HttpService, BadRequestException, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, merge } from 'rxjs';
import { map, reduce } from 'rxjs/operators';
import { SerializeNewYorkNew, SerializeGuardianNew, SerializeNewsApiNew } from './helpers/serialize.helper';
import { New } from './interfaces/New.interface';
import { NewsConstants as cts } from './news.constants';

@Injectable()
export class NewsService {
  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

  switchSourceSearch(q: string, source: string): Observable<New[]> {
    switch (source.toLowerCase()) {
      case 'nyt':
        return this.newYorkTimeSearch(q);

      case 'guardian':
        return this.guardianSearch(q);

      case 'news':
        return this.newsApiSearch(q);

      case 'all':
        return this.allSearch(q);

      default:
        throw new BadRequestException('Invalid source for search');
    }
  }

  private newYorkTimeSearch(searchTerm: string): Observable<New[]> {
    try {
      const NYT_KEY = this.configService.get<string>('NYT_KEY');

      return this.httpService
        .get(`${cts.NYT_URL}q=${searchTerm}&api-key=${NYT_KEY}${cts.NYT_FILTERS}`)
        .pipe(map(res => res.data.response.docs.map(SerializeNewYorkNew)));
    } catch {
      throw new ServiceUnavailableException('NYT does not respond');
    }
  }

  private guardianSearch(searchTerm: string): Observable<New[]> {
    try {
      const GUARDIAN_KEY = this.configService.get<string>('GUARDIAN_KEY');

      return this.httpService
        .get(`${cts.GUARDIAN_URL}?api-key=${GUARDIAN_KEY}&q=${searchTerm}${cts.GUARDIAN_FILTERS}`)
        .pipe(map(res => res.data.response.results.map(SerializeGuardianNew)));
    } catch {
      throw new ServiceUnavailableException('Guardian does not respond');
    }
  }

  private newsApiSearch(searchTerm: string): Observable<New[]> {
    try {
      const NEWS_KEY = this.configService.get<string>('NEWS_KEY');

      return this.httpService
        .get(`${cts.NEWS_URL}apiKey=${NEWS_KEY}&q=${searchTerm}`)
        .pipe(map(res => res.data.articles.map(SerializeNewsApiNew)));
    } catch {
      throw new ServiceUnavailableException('NewsAPI does not respond');
    }
  }

  private allSearch(searchTerm: string): Observable<New[]> {
    const nytSearch = this.newYorkTimeSearch(searchTerm);
    const guardianSearch = this.guardianSearch(searchTerm);
    const newsApiSearch = this.newsApiSearch(searchTerm);

    return merge(nytSearch, guardianSearch, newsApiSearch).pipe(reduce((acc, value) => [...acc, ...value]));
  }
}
