import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class ValidateJsonMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function): void {
    const methods = ['get', 'delete'];

    if (methods.includes(req.method.toLocaleLowerCase())) {
      next();
    } else {
      if (req.headers['content-type'] !== 'application/json') {
        res
          .status(415)
          .contentType('application/json')
          .json({ message: 'JSON encoding required' });
      } else {
        next();
      }
    }
  }
}
