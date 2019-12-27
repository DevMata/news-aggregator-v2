import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersToNews } from './userstonews.entity';
import { UsersToNewsService } from './userstonews.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersToNews])],
  providers: [UsersToNewsService],
  exports: [UsersToNewsService],
})
export class UsersToNewsModule {}
