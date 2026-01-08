import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ENV } from "config/env";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "AUTH_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [ENV.AMQP_URI],
          queue: "auth.transactional.queue",
          queueOptions: {
            durable: true
          }
        }
      }
    ])
  ],
  controllers: [AuthController]
})
export class AuthModule {}