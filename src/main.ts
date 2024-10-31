import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

import { Request, Response } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    rawBody?: string;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  app.enableCors();

  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    })
  );

  interface RawBodyBuffer {
    (req: Request, res: import('http').ServerResponse, buffer: Buffer, encoding: string): void;
  }

  const rawBodyBuffer: RawBodyBuffer = (req, res, buffer, encoding) => {
    if (!req.headers['stripe-signature']) { return; }

    if (buffer && buffer.length) {
      req.rawBody = buffer.toString((encoding as BufferEncoding) || 'utf8');
    }
  };

  app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
  app.use(bodyParser.json({ verify: rawBodyBuffer }));

  const config = new DocumentBuilder()
    .setTitle('Software 1 API')
    .setDescription('Software 1 Endpoints')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
  logger.log(`App running on port ${process.env.PORT}`);
}
bootstrap();
