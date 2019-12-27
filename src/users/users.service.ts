import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { HashHelper } from 'src/common/hash.helper';
import { NewsService } from './articles/news.service';
import { UsersToNewsService } from './userstoarticles/userstonews.service';
import { SaveArticleDto } from './articles/articles.dto';
import { Article } from './articles/articles.entity';
import { UsersToNews } from './userstoarticles/userstonews.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly newsService: NewsService,
    private readonly usersToNewsService: UsersToNewsService,
    private readonly hashHelper: HashHelper,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createOne(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password } = createUserDto;
      createUserDto.password = this.hashHelper.hash(password);

      const newUser = await this.userRepository.save(createUserDto);
      return newUser;
    } catch {
      throw new ConflictException('User already exists');
    }
  }

  findUserById(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findUserByName(username: string): Promise<User> {
    return this.userRepository.findOne({ username: username });
  }

  async changePassword(id: string, password: string): Promise<UpdateResult> {
    const user = await this.findUserById(id);
    if (!user) throw new NotFoundException('User not found');

    return this.userRepository.update(id, { password: this.hashHelper.hash(password) });
  }

  async saveArticleToUser(userId: string, saveArticleDto: SaveArticleDto): Promise<UsersToNews> {
    const user = await this.findUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    const article = await this.newsService.saveArticle(saveArticleDto);

    return this.usersToNewsService.saveArticleToUser(user, article);
  }

  async getUserArticles(userId: string): Promise<Article[]> {
    const user = await this.findUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    const x = await this.userRepository.findOne({
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          usersToNews: 'user.usersToNews',
          new: 'usersToNews.article',
        },
      },
      where: { userId: userId },
    });

    if (x && x.usersToNews) {
      return x.usersToNews.map(rel => rel.article);
    } else {
      return [];
    }
  }
}
