import { Controller, Post, Request, UseGuards, Res } from '@nestjs/common';
import { LoginService } from './login.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('signin')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req): Promise<{ accessToken: string }> {
    return this.loginService.login(req.user);
  }

  @Post('signup')
  async signup(@Res() res: Response): Promise<void> {
    return res.redirect(307, '/users');
  }
}
