import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { ValidationPipe } from '@nestjs/common';
import session from "express-session";
import passport from "passport";
import { RedisService } from './modules/redis/redis.service';
import { RedisStore } from "connect-redis"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const redisService = app.get(RedisService);
  const redisClient = redisService.getClient();  

  /**
   * global prefix with versioning
   */
  app.setGlobalPrefix("/api/v1");
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  app.use(
    session({
      name: "Auth Session",
      secret: process.env.SESSION_SECRET ?? "sldfnrofnr-rn[eeneov",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60, // Set the Cookie to expire in 1 hour
        // maxAge: 1000 * 60 * 60 * 24 // One Day
      },
      store: new RedisStore({
        client: redisClient,
        prefix: "sessions:"
      })
    })
  )

  app.use(passport.initialize());
  app.use(passport.session());

  /**
   * Configure Swagger Documentations
   */
  const config = new DocumentBuilder()
    .setTitle("LinkTree Clone")
    .setVersion("1.0")
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      name: "JWT",
      description: "Enter JWT Token",
      in: "header"
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/v1/docs", app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
