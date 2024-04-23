// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

export async function bootstrap(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
  return app;
}

if (process.env.NODE_ENV !== 'test') {
  bootstrap();
}
