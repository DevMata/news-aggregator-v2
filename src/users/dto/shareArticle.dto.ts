import { IsUUID, IsUrl } from 'class-validator';

export class ShareArticleDto {
  @IsUUID()
  userId: string;

  @IsUrl()
  webUrl: string;
}
