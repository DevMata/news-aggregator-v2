import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { verify } from 'jsonwebtoken';

export function hasAccess(request: Request, secret: string): boolean {
  const source = String(request.query['source']).toLocaleLowerCase();

  try {
    if (source === 'guardian') {
      return true;
    }

    if (source === 'nyt' || source === 'both') {
      const bearerToken = request.headers['authorization'];

      if (!bearerToken) {
        throw new UnauthorizedException('No token provided');
      }

      verify(bearerToken.split(' ')[1], secret);
      return true;
    }
  } catch {
    throw new UnauthorizedException('Invalid or expired token');
  }
}
