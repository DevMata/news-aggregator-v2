import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UsersToNews } from '../userstonews/userstonews.entity';

@Entity()
export class New {
  @PrimaryGeneratedColumn('uuid')
  newId: string;

  @Column()
  webUrl: string;

  @OneToMany(
    type => UsersToNews,
    usersToNews => usersToNews.new,
  )
  public usersToNews!: UsersToNews;
}
