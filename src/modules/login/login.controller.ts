import { Body, Controller, Post } from '@nestjs/common';
import { SignInDTO } from './dto/sign-in.dto';
import { SignInUseCase } from './use-cases/sign-in.use-case';

@Controller()
export class LoginController {
  constructor(private signInUseCase: SignInUseCase) {}

  @Post('/sign-in')
  async signIn(@Body() data: SignInDTO) {
    const token = await this.signInUseCase.execute(data);

    return token;
  }
}
