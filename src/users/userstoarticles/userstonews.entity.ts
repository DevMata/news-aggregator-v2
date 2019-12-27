import { Entity, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from '../articles/articles.entity';
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
    () => Article,
    article => article.usersToNews,
  )
  public article!: Article;
}
