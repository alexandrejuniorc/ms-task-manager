import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('/notification')
export class NotificationController {
  constructor(
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationClient: ClientProxy,
  ) {}

  @Get('/send-notification')
  testMsNotification() {
    // send message to eventPattern task-notification
    this.notificationClient.emit('task-notification', {
      message: 'hello',
    });
  }
}
