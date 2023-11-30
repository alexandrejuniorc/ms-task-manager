import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class NotificationTaskUserSchedule {
  constructor() {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  getAllTasksDay() {
    console.log('Tasks Ok!', new Date());
  }
}
