import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { CreateUserValidationPipe } from './pipe/create-user.validation.pipe';
import { AuthGuard } from 'src/infrastructure/providers/auth-guard.provider';
import { ProfileUserUseCase } from './use-cases/profile-user.use-case';
import {
  CreateUserResponseSchemaDTO,
  CreateUserSchemaDTO,
} from './schemas/create-user.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDTO } from './dto/user.dto';

@Controller('/users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly profileUserUseCase: ProfileUserUseCase,
  ) {}

  @Post()
  @UsePipes(new CreateUserValidationPipe())
  async create(@Body() data: CreateUserSchemaDTO) {
    const user = await this.createUserUseCase.execute(data);
    return CreateUserResponseSchemaDTO.parse(user);
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  async profile(@Request() request) {
    return this.profileUserUseCase.execute(request.user.sub);
  }

  @Post('/avatar')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@Request() request, @UploadedFile() file: FileDTO) {
    console.log({ file });
  }
}
