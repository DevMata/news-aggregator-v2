import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { HashHelper } from 'src/common/hash.helper';
import { NewsService } from './news/news.service';
import { UsersToNewsService } from './userstonews/userstonews.service';
import { SaveNewDto } from './news/news.dto';

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

  async saveNewToUser(userId: string, a: SaveNewDto): Promise<void> {
    const user = await this.findUserById(userId);
    if (!user) throw new NotFoundException('User does not exists');

    const article = await this.newsService.saveNew(a);

    this.usersToNewsService.saveArticleToUser(user, article);
  }
}
