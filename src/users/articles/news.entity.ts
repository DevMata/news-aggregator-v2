import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UsersToNews } from '../userstoarticles/userstonews.entity';

@Entity()
export class New {
  @PrimaryGeneratedColumn('uuid')
  newId: string;

  @Column()
  webUrl: string;

  @OneToMany(
    () => UsersToNews,
    usersToNews => usersToNews.article,
  )
  public usersToNews!: UsersToNews[];
}
