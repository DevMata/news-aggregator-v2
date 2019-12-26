import { Entity, PrimaryColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { New } from '../news/news.entity';
import { User } from '../user.entity';

@Entity()
export class UsersToNews {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  newId: string;

  @CreateDateColumn()
  savedAt: Date;

  @ManyToOne(
    type => User,
    user => user.usersToNews,
  )
  public user!: User;

  @ManyToOne(
    type => New,
    n => n.usersToNews,
  )
  public new!: New;
}
