import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UsersToArticles } from './userstoarticles/userstoarticles.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ length: 200, unique: true })
  username: string;

  @Column({ length: 300 })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @OneToMany(
    () => UsersToArticles,
    usersToArticles => usersToArticles.user,
  )
  public usersToArticles!: UsersToArticles[];
}
