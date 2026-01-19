import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import cors from 'cors';
import express from 'express';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ENV } from 'config/env';
import { ValidationPipe } from '@nestjs/common';
import { RpcToHttpExceptionFilter } from './errors/rpc-to-http.exception';
import cookieParser from "cookie-parser"

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const GATEWAY_PORT = ENV.GATEWAY_PORT;

    app.use(helmet());
    app.use(
      cors({
        origin: [
          "http://localhost:3000",
          "http://127.0.0.1:3000",
        ],
        credentials: true,
      }),
    );
  
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    }));
    app.useGlobalFilters(new RpcToHttpExceptionFilter())
    app.setGlobalPrefix("api");
    

    const options = new DocumentBuilder()
      .setTitle("API Docs")
      .addBearerAuth(
        {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          name: "authorization",
          in: "header"
        }, 
        "access-token"
      )
      .addTag("auth")
      .setVersion("1.0")
      .build();
        
    const documentFactory = () => SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("docs", app, documentFactory);

    await app.listen(Number(GATEWAY_PORT), () => {
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
