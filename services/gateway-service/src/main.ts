import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import cors from 'cors';
import express, { Response } from 'express';
import { registerRoutes } from 'routes';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const GATEWAY_PORT = 3001;

    app.use(helmet());
    app.use(
      cors({
        origin: '*',
        credentials: true,
      }),
    );
  
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    registerRoutes(app);

    app.use((req, res: Response) => {
      res.status(404).json({ message: "Not Found" });
    });
  
    await app.listen(GATEWAY_PORT, () => {
      console.log(`ApiGateway Server Listening on PORT=${GATEWAY_PORT}`)
    });


    const shutDown = () => {
      Promise.all([])
        .catch(err => {
          console.error("Error during shutdown task")
        })
        .finally(()=> {
          app.close();
        });
    }

    process.on("SIGINT", shutDown);
    process.on("SIGTERM", shutDown);
  }catch(err) {
    process.exit(1);
  }
}
bootstrap();
