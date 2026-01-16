import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ENV } from "config/env";
import { LinkController } from "./link.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "LINK_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [ENV.AMQP_URI],
          queue: "link.service.queue",
          queueOptions: {
            durable: true,
          },
        }
      }
    ]),
  ],
  controllers: [LinkController],
})
export class LinkModule {}