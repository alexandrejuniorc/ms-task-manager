import { ITaskUserRepository } from '@/modules/tasks/repositories/task-user.repository';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';

type MessageDTO = {
  email: string;
  startsAt: Date;
  endsAt: Date;
  name: string;
  title: string;
  description: string;
};

@Injectable()
export class NotificationTaskUserSchedule {
  constructor(
    private taskRepository: ITaskUserRepository,
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationClient: ClientKafka,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async getAllTasksDay() {
    const allTasks = await this.taskRepository.findAllStartDays();

    if (allTasks) {
      allTasks.forEach((task) => {
        const message: MessageDTO = {
          name: task.user.name,
          email: task.user.email,
          title: task.task.title,
          description: task.task.description,
          startsAt: task.task.startsAt,
          endsAt: task.task.endsAt,
        };
        this.notificationClient.emit('topic-task-notification', message);
      });
    }
  }
}
