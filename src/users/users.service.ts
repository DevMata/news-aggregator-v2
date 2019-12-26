import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { HashHelper } from 'src/common/hash.helper';
import { NewsService } from './news/news.service';
import { UsersToNewsService } from './userstonews/userstonews.service';

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
      console.log('User already exists');
    }
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async updateUser(id: string, password: string): Promise<UpdateResult> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    return this.userRepository.update(id, { password: this.hashHelper.hash(password) });
  }

  findOneByName(username: string): Promise<User> {
    return this.userRepository.findOne({ username: username });
  }
}
