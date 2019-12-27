import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Validator } from 'class-validator';

@Injectable()
export class ValidateUuidMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function): void {
    const validator = new Validator();

    const tokens = req.url.split('/');

    if (tokens.length > 1 && tokens.every(tok => tok !== '')) {
      if (validator.isUUID(tokens[1])) {
        next();
      } else {
        res
          .status(400)
          .contentType('application/json')
          .json({ message: 'A valid Uuid is required' });
      }
    } else {
      next();
    }
  }
}
