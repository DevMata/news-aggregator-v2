import { IsUrl } from 'class-validator';

export class SaveNewDto {
  @IsUrl()
  webUrl: string;
}
