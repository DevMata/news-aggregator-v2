import { Injectable, HttpService, BadRequestException, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, merge } from 'rxjs';
import { map, reduce } from 'rxjs/operators';

import { SerializeNewYorkNew, SerializeGuardianNew } from './helpers/serialize.helper';
import { New } from './interfaces/New.interface';

const NYT_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';
const NYT_FILTERS = '&sort=relevance&fl=_id,pub_date,snippet,web_url,headline,byline';
const GUARDIAN_URL = 'https://content.guardianapis.com/search';
const GUARDIAN_FILTERS = '&show-tags=contributor';

@Injectable()
export class NewsService {
  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

  switchSourceSearch(q: string, source: string): Observable<New[]> {
    switch (source.toLowerCase()) {
      case 'nyt':
        return this.newYorkTimeSearch(q);

      case 'guardian':
        return this.guardianSearch(q);

      case 'both':
        return this.bothSearch(q);

      default:
        throw new BadRequestException('Invalid source for search');
        break;
    }
  }

  private newYorkTimeSearch(searchTerm: string): Observable<New[]> {
    try {
      const NYT_KEY = this.configService.get<string>('NYT_KEY');

      return this.httpService
        .get(`${NYT_URL}q=${searchTerm}&api-key=${NYT_KEY}${NYT_FILTERS}`)
        .pipe(map(res => res.data.response.docs.map(SerializeNewYorkNew)));
    } catch {
      throw new ServiceUnavailableException('NYT does not respond');
    }
  }

  private guardianSearch(searchTerm: string): Observable<New[]> {
    try {
      const GUARDIAN_KEY = this.configService.get<string>('GUARDIAN_KEY');

      return this.httpService
        .get(`${GUARDIAN_URL}?api-key=${GUARDIAN_KEY}&q=${searchTerm}${GUARDIAN_FILTERS}`)
        .pipe(map(res => res.data.response.results.map(SerializeGuardianNew)));
    } catch (error) {
      throw new ServiceUnavailableException('Guardian does not respond');
    }
  }

  private bothSearch(searchTerm: string): Observable<New[]> {
    const nytSearch = this.newYorkTimeSearch(searchTerm);
    const guardianSearch = this.guardianSearch(searchTerm);

    return merge(nytSearch, guardianSearch).pipe(reduce((acc, value) => [...acc, ...value]));
  }
}
