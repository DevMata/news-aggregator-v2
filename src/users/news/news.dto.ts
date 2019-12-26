import { IsFQDN } from 'class-validator';

export class SaveNewDto {
  @IsFQDN()
  webUrl: string;
}
