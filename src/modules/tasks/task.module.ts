import { Module } from '@nestjs/common';
import { TaskUserController } from './task.controller';
import { CreateTaskUserUseCase } from './use-cases/create-task-user.use-case';
import { ITaskUserRepository } from './repositories/task-user.repository';
import { TaskUserPrismaRepository } from './prisma/task-user.prisma.repository';
import { PrismaService } from 'src/infrastructure/database/prisma.service';

@Module({
  imports: [],
  controllers: [TaskUserController],
  providers: [
    CreateTaskUserUseCase,
    PrismaService,
    {
      provide: ITaskUserRepository,
      useClass: TaskUserPrismaRepository,
    },
  ],
})
export class TaskUserModule {}
