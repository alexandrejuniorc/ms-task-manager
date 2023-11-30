import { Module } from '@nestjs/common';
import { NotificationTaskUserSchedule } from './notification-task-user.schedule';
import { ScheduleModule } from '@nestjs/schedule';
import { ITaskUserRepository } from '@/modules/tasks/repositories/task-user.repository';
import { TaskUserPrismaRepository } from '@/modules/tasks/prisma/task-user.prisma.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.TCP,
        options: { host: '0.0.0.0', port: 3001 },
      },
    ]),
  ],
  providers: [
    NotificationTaskUserSchedule,

    {
      provide: ITaskUserRepository,
      useClass: TaskUserPrismaRepository,
    },
  ],
  exports: [],
})
export class ScheduleTaskModule {}
