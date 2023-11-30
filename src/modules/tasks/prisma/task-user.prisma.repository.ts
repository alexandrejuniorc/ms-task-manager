import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { ITaskUserRepository } from '../repositories/task-user.repository';
import {
  TaskUserNotificationDTO,
  TaskUserRequestDTO,
  TaskUserResponseDTO,
} from '../dto/task-user.dto';
import { Injectable } from '@nestjs/common';
import { endOfDay, startOfDay } from '../../../infrastructure/utils/date';

@Injectable()
export class TaskUserPrismaRepository implements ITaskUserRepository {
  constructor(private prismaService: PrismaService) {}

  async save(data: TaskUserRequestDTO): Promise<TaskUserResponseDTO> {
    return await this.prismaService.taskUser.create({
      data: {
        task: {
          create: {
            description: data.description,
            title: data.title,
            status: data.status,
            priority: data.priority,
            startsAt: data.startsAt,
            endsAt: data.endsAt,
          },
        },
        user: { connect: { id: data.userId } },
      },
    });
  }

  async findAllStartDays(): Promise<TaskUserNotificationDTO[] | null> {
    return await this.prismaService.taskUser.findMany({
      where: {
        AND: [
          {
            task: {
              startsAt: {
                gte: startOfDay(),
                lte: endOfDay(),
              },
            },
          },
        ],
      },
      include: {
        task: {
          select: {
            startsAt: true,
            endsAt: true,
            title: true,
            description: true,
          },
        },
        user: true,
      },
    });
  }
}
