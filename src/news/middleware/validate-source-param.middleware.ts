import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class ValidateSourceParamMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function): void {
    const validSources = ['nyt', 'guardian', 'both'];

    if (!req.query['source']) {
      res
        .status(400)
        .contentType('application/json')
        .json({ message: 'source query param needed' });
    } else {
      const source = String(req.query['source']).toLowerCase();
      if (!validSources.includes(source)) {
        res
          .status(400)
          .contentType('application/json')
          .json({ message: 'source query param: acepted values nyt|guardian|both' });
      } else {
        next();
      }
    }
  }
}
