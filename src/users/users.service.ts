import { Injectable, NotFoundException, ConflictException, MethodNotAllowedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { HashHelper } from 'src/common/hash.helper';
import { ArticlesService } from './articles/articles.service';
import { UsersToArticlesService } from './userstoarticles/userstoarticles.service';
import { SaveArticleDto } from './articles/articles.dto';
import { Article } from './articles/articles.entity';
import { UsersToArticles } from './userstoarticles/userstoarticles.entity';
import { UserBody } from 'src/login/dto/userbody.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly articlesService: ArticlesService,
    private readonly usersToArticlesService: UsersToArticlesService,
    private readonly hashHelper: HashHelper,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find({ select: ['userId', 'username', 'createdAt', 'modifiedAt'] });
  }

  async createOne(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password } = createUserDto;
      createUserDto.password = this.hashHelper.hash(password);

      return this.userRepository.save(createUserDto);
    } catch {
      throw new ConflictException('User already exists');
    }
  }

  findUserById(id: string): Promise<User> {
    return this.userRepository.findOne(id, { select: ['userId', 'username', 'createdAt', 'modifiedAt'] });
  }

  findUserByName(username: string): Promise<User> {
    return this.userRepository.findOne({ username: username });
  }

  async changePassword(id: string, password: string): Promise<UpdateResult> {
    const user = await this.findUserById(id);
    if (!user) throw new NotFoundException('User not found');

    return this.userRepository.update(id, { password: this.hashHelper.hash(password) });
  }

  async saveArticleToUser(userId: string, saveArticleDto: SaveArticleDto): Promise<UsersToArticles> {
    const user = await this.findUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    const article = await this.articlesService.saveArticle(saveArticleDto);

    return this.usersToArticlesService.saveArticleToUser(user, article);
  }

  async getUserArticles(userId: string): Promise<Article[]> {
    const user = await this.findUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    const x = await this.userRepository.findOne({
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          usersToArticles: 'user.usersToArticles',
          article: 'usersToArticles.article',
        },
      },
      where: { userId: userId },
    });

    if (x && x.usersToArticles) {
      return x.usersToArticles.map(rel => rel.article);
    } else {
      return [];
    }
  }

  async shareArticle(user: UserBody, userId: string, webUrl: string): Promise<UsersToArticles> {
    if (user.userId === userId) {
      throw new MethodNotAllowedException('User must no share articles with himself');
    }

    return this.saveArticleToUser(userId, { webUrl });
  }
}
