import { Entity, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { New } from '../news/news.entity';
import { User } from '../user.entity';

@Entity()
export class UsersToNews {
  @PrimaryGeneratedColumn('uuid')
  usersToNewsId: string;

  @CreateDateColumn()
  savedAt: Date;

  @ManyToOne(
    () => User,
    user => user.usersToNews,
  )
  public user!: User;

  @ManyToOne(
    () => New,
    article => article.usersToNews,
  )
  public article!: New;
}
