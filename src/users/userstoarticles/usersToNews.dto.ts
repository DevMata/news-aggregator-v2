import { IsUUID } from 'class-validator';

export class SaveNewToUserDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  newId: string;
}
