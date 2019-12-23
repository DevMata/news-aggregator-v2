import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { hasAccess } from '../helpers/validateAccess.helper';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ValidateAccessGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const secret = this.configService.get<string>('JWT_SECRET');

    return hasAccess(request, secret);
  }
}
