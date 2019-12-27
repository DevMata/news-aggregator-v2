import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { UserBody } from './dto/userbody.dto';

@Injectable()
export class LoginService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<UserBody> {
    const user = await this.usersService.findUserByName(username);

    if (user && compareSync(password, user.password)) {
      const { userId, username } = user;
      return { userId, username };
    }
    return null;
  }

  async login(user: UserBody): Promise<{ accessToken: string }> {
    const payload = { username: user.username, sub: user.userId };

    return { accessToken: this.jwtService.sign(payload) };
  }
}
