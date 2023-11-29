import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { ITaskUserRepository } from '../repositories/task-user.repository';
import { TaskUserRequestDTO, TaskUserResponseDTO } from '../dto/task-user.dto';

export class TaskUserPrismaRepository implements ITaskUserRepository {
  constructor(private prismaService: PrismaService) {}

  async save(data: TaskUserRequestDTO): Promise<TaskUserResponseDTO> {
    return await this.prismaService.taskUser.create({
      data: {
        task: {
          create: {
            title: data.title,
            description: data.description,
            startsAt: data.startsAt,
            endsAt: data.endsAt,
            priority: data.priority,
            status: data.status,
          },
        },
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    });
  }
}
