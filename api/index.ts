import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import { setupApp } from '../src/main';
import express from 'express';

const server = express();

// Esta lógica asegura que Nest se inicialice solo una vez por instancia
let cachedApp;

async function bootstrap() {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    await setupApp(app);
    await app.init();
    cachedApp = app;
  }
  return server;
}

export default async (req: any, res: any) => {
  await bootstrap();
  return server(req, res);
};