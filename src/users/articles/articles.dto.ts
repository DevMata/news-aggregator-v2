import { IsUrl } from 'class-validator';

export class SaveArticleDto {
  @IsUrl()
  webUrl: string;
}
