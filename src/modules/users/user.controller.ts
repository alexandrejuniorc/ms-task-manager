import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { CreateUserValidationPipe } from './pipe/create-user.validation.pipe';

import { ProfileUserUseCase } from './use-cases/profile-user.use-case';
import {
  CreateUserResponseSchemaDTO,
  CreateUserSchemaDTO,
} from './schemas/create-user.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDTO } from './dto/user.dto';
import { UploadAvatarUserUseCase } from './use-cases/upload-avatar-user.use-case';
import { AuthGuard } from '../../infrastructure/providers/auth-guard.provider';

@Controller('/users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly profileUserUseCase: ProfileUserUseCase,
    private readonly uploadAvatarUserUseCase: UploadAvatarUserUseCase,
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

  @Put('/avatar')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  async uploadAvatar(@Request() request, @UploadedFile() file: FileDTO) {
    const result = await this.uploadAvatarUserUseCase.execute({
      file,
      userId: request.user.sub,
    });

    return result;
  }
}
