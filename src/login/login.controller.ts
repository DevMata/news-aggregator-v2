import { Controller, Post, Body, UsePipes, BadRequestException } from '@nestjs/common';
import { ValidateLoginPayloadPipe } from './pipes/validate-login-payload.pipe';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';

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
}
