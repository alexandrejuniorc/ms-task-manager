import { Module } from '@nestjs/common';

import { UserModule } from './modules/users/user.module';
import { LoginModule } from './modules/login/login.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { TaskUserModule } from './modules/tasks/task.module';
import { NotificationModule } from './modules/notification/notification.module';
import { ScheduleTaskModule } from './infrastructure/jobs/schedule.module';

@Module({
  imports: [
    UserModule,
    LoginModule,
    TaskUserModule,
    NotificationModule,
    ScheduleTaskModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
