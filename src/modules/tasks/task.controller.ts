import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { CreateTaskUserUseCase } from './use-cases/create-task-user.use-case';
import { AuthGuard } from 'src/infrastructure/providers/auth-guard.provider';
import { CreateTaskUserSchemaDTO } from './schemas/task-user.schema';

@Controller('/tasks')
export class TaskUserController {
  constructor(private createTaskUserUseCase: CreateTaskUserUseCase) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() data: CreateTaskUserSchemaDTO, @Request() request) {
    return this.createTaskUserUseCase.execute({
      ...data,
      userId: request.user.sub,
    });
  }
}
