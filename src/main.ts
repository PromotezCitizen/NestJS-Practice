import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Axios Error 해결
  app.use(express.static(join(__dirname, '..', 'static', 'for_test_html')));
  await app.listen(3000);
}
bootstrap();
