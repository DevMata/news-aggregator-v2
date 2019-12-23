import { Module, HttpModule } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [HttpModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
