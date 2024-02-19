import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { WinstonModule } from 'nest-winston';
import { loggerConfig } from './logger/logger.config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(
      loggerConfig
    ),
  });
  app.enableCors(); // Axios Error 해결

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(express.static(join(__dirname, '..', 'static', 'for_test_html')));
  await app.listen(3000);
}
bootstrap();
