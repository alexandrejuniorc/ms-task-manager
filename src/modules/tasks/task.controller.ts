import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { CreateTaskUserUseCase } from './use-cases/create-task-user.use-case';
import { AuthGuard } from 'src/infrastructure/providers/auth-guard.provider';
import {
  CreateTaskUserSchema,
  CreateTaskUserSchemaDTO,
} from './schemas/task-user.schema';
import { zodToOpenAPI } from 'nestjs-zod';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

const schemaTaskUserSwagger = zodToOpenAPI(CreateTaskUserSchema);

@Controller('/tasks')
@ApiTags('tasks')
export class TaskUserController {
  constructor(private createTaskUserUseCase: CreateTaskUserUseCase) {}

  @Post()
  @ApiBody({ description: 'Create Task User', schema: schemaTaskUserSwagger })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(@Body() data: CreateTaskUserSchemaDTO, @Request() request) {
    return this.createTaskUserUseCase.execute({
      ...data,
      userId: request.user.sub,
    });
  }
}
