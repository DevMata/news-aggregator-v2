import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Validator } from 'class-validator';

@Injectable()
export class ValidateUuidMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function): void {
    const validator = new Validator();

    if (validator.isUUID(req.param['id'])) {
      next();
    } else {
      res
        .status(400)
        .contentType('application/json')
        .json({ message: 'A valid Uuid is required' });
    }
  }
}
