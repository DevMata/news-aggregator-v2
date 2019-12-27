import { Exclude } from 'class-transformer';

export class UserSerialize {
  userId: string;
  username: string;

  @Exclude()
  password: string;

  createdAt: Date;
  modifiedAt: Date;

  constructor(partial: Partial<UserSerialize>) {
    Object.assign(this, partial);
  }
}
