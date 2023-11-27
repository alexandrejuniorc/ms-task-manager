import { Controller, Get } from '@nestjs/common';

@Controller()
export class UserController {
  @Get('/helloUser')
  helloUser() {
    return 'Seja bem vindo(a) ao curso de NestJS';
  }
}
