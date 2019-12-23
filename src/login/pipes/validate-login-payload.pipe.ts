import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class ValidateLoginPayloadPipe implements PipeTransform {
  async transform(value: LoginDto, { metatype }: ArgumentMetadata): Promise<LoginDto> {
    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length) {
      throw new BadRequestException('username and password are required');
    }
    return value;
  }
}
