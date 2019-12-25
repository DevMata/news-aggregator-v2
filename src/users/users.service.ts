import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { HashHelper } from 'src/common/hash.helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashHelper: HashHelper,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  createOne(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    createUserDto.password = this.hashHelper.hash(password);

    return this.userRepository.save(createUserDto);
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
