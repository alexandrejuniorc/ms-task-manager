import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/user.dto';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: CreateUserDTO, metadata: ArgumentMetadata) {
    if (!value.name || !value.email || !value.username || !value.password) {
      throw new HttpException(
        `[name, email, username, password] is required`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return value;
  }
}
