import { Controller, Post, Body, UsePipes, BadRequestException, Request, UseGuards } from '@nestjs/common';
import { ValidateLoginPayloadPipe } from './pipes/validate-login-payload.pipe';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @UsePipes(ValidateLoginPayloadPipe)
  validateLogin(@Body() user: LoginDto): { token: string } {
    if (this.loginService.findUser(user)) {
      const token = this.loginService.generateToken(user);
      return { token };
    } else {
      throw new BadRequestException('User not found');
    }
  }

  @Post('auth')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req): Promise<{ accessToken: string }> {
    return this.loginService.login(req.user);
  }
}
