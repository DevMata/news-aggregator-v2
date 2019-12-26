import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { sign } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';

@Injectable()
export class LoginService {
  private readonly Users: LoginDto[] = [];

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    this.pushUser();
  }

  private pushUser(): void {
    const username = this.configService.get<string>('DUMMY_USER');
    const password = this.configService.get<string>('DUMMY_PASSWORD');

    this.Users.push({ username, password });
  }

  public findUser(user: LoginDto): boolean {
    const searchedUser = this.Users.filter(u => u.username === user.username && u.password === user.password);
    return searchedUser.length ? true : false;
  }

  public generateToken(user: LoginDto): string {
    const secret = this.configService.get<string>('JWT_SECRET');

    return sign(user, secret, { expiresIn: '1h' });
  }

  async validateUser(username: string, password: string): Promise<{ userId: string; username: string }> {
    const user = await this.usersService.findOneByName(username);

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
