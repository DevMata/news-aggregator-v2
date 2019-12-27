import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { sign } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';

@Injectable()
export class LoginService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<{ userId: string; username: string }> {
    const user = await this.usersService.findUserByName(username);

    if (user && compareSync(password, user.password)) {
      const { userId, username } = user;
      return { userId, username };
    }
    return null;
  }

  async login(user: { userId: string; username: string }): Promise<{ accessToken: string }> {
    const payload = { username: user.username, sub: user.userId };

    return { accessToken: this.jwtService.sign(payload) };
  }
}
