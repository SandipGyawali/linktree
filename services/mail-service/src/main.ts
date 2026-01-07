import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ENV } from 'config/env';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [ENV.AMQP_URI],
        queue: 'mail.transactional.queue',
        prefetchCount: 2,
        queueOptions: { durable: true },
      },
      logger: ["error", "log", "warn"]
    },
  );
  await app.listen();
}

bootstrap();