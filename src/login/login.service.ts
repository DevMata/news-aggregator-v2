import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class LoginService {
  private readonly Users: LoginDto[] = [];

  constructor(private readonly configService: ConfigService) {
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
}
