import { Module } from '@nestjs/common';
import { MailController } from './email.controller';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { ENV } from 'config/env';

@Module({
  imports: [
    // mail-service module registration with 
    // rabbitmq url and queue
    ClientsModule.register([
      {
        name: "MAIL_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [ENV.AMQP_URI],
          queue: "mail.transactional.queue",
          queueOptions: { durable: true }
        }
      }
    ]),
  ],
  controllers: [MailController],
})
export class EmailModule {}
