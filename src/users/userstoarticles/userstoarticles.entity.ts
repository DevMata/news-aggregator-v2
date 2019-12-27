import { Entity, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from '../articles/articles.entity';
import { User } from '../user.entity';

@Entity()
export class UsersToArticles {
  @PrimaryGeneratedColumn('uuid')
  usersToArticlesId: string;

  @CreateDateColumn()
  savedAt: Date;

  @ManyToOne(
    () => User,
    user => user.usersToArticles,
  )
  public user!: User;

  @ManyToOne(
    () => Article,
    article => article.usersToArticles,
  )
  public article!: Article;
}
