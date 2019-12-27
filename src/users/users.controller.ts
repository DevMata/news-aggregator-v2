import { Controller, Get, Post, UsePipes, ValidationPipe, Body, Param, Put } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { ChangePasswordDto } from './dto/password.dto';
import { UpdateResult } from 'typeorm';
import { SaveNewDto } from './articles/news.dto';
import { New } from './articles/news.entity';
import { UsersToNews } from './userstoarticles/userstonews.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findUser(@Param('id') id: string): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createUser(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.createOne(createUserDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateUser(@Param('id') id: string, @Body() changePasswordDto: ChangePasswordDto): Promise<UpdateResult> {
    return this.userService.changePassword(id, changePasswordDto.password);
  }

  @Post(':userId')
  @UsePipes(new ValidationPipe({ transform: true }))
  saveArticleToUser(@Param('userId') userId: string, @Body() saveNewDto: SaveNewDto): Promise<UsersToNews> {
    return this.userService.saveArticleToUser(userId, saveNewDto);
  }

  @Get(':userId/articles')
  getUserArticles(@Param('userId') userId: string): Promise<New[]> {
    return this.userService.getUserArticles(userId);
  }
}
