import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class ValidateSearchMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function): void {
    if (!req.query['q']) {
      res
        .status(400)
        .contentType('application/json')
        .json({ message: 'q param needed' });
    } else {
      next();
    }
  }
}
