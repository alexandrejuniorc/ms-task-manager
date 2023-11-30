import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.TCP,
        options: { host: '0.0.0.0', port: 3001 },
      },
    ]),
  ],
  controllers: [NotificationController],
  providers: [],
})
export class NotificationModule {}
