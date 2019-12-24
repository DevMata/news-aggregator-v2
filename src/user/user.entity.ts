import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ length: 200 })
  username: string;

  @Column({ length: 300 })
  password: string;

  @Column({ type: 'timestamp with time zone', default: 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp with time zone', default: null })
  modifiedAt: Date;
}
