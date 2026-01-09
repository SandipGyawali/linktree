import { Global, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ENV } from "src/config/env";

@Global()
@Module({
  imports: [
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
  exports: [ClientsModule], 
})
export class MailModule {}
