import {
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Param,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { ChangePasswordDto } from './dto/password.dto';
import { UpdateResult } from 'typeorm';
import { SaveArticleDto } from './articles/articles.dto';
import { Article } from './articles/articles.entity';
import { UsersToArticles } from './userstoarticles/userstoarticles.entity';
import { UserSerialize } from './users.serializer';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':userId')
  @UseInterceptors(ClassSerializerInterceptor)
  findUser(@Param('userId') userId: string): Promise<UserSerialize> {
    return this.userService.findUserById(userId);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  createUser(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<UserSerialize> {
    return this.userService.createOne(createUserDto);
  }

  @Put(':userId')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateUser(@Param('userId') userId: string, @Body() changePasswordDto: ChangePasswordDto): Promise<UpdateResult> {
    return this.userService.changePassword(userId, changePasswordDto.password);
  }

  @Post(':userId')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ transform: true }))
  saveArticleToUser(@Param('userId') userId: string, @Body() saveArticleDto: SaveArticleDto): Promise<UsersToArticles> {
    return this.userService.saveArticleToUser(userId, saveArticleDto);
  }

  @Get(':userId/articles')
  @UseGuards(AuthGuard('jwt'))
  getUserArticles(@Param('userId') userId: string): Promise<Article[]> {
    return this.userService.getUserArticles(userId);
  }
}
