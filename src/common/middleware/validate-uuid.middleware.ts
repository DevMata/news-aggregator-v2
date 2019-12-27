import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Validator } from 'class-validator';

@Injectable()
export class ValidateUuidMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function): void {
    const validator = new Validator();

    if (req.url === '/') {
      next();
    } else {
      if (validator.isUUID(req.url.split('/')[1])) {
        next();
      } else {
        res
          .status(404)
          .contentType('application/json')
          .json({ message: 'a valid uuid is required' });
      }
    }
  }
}
