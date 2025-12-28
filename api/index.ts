import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import { setupApp } from '../src/main';
import express from 'express';

const server = express();

const promise = (async () => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await setupApp(app);
  await app.init();
})();

// ESTO ES LO QUE VERCEL ESTÁ BUSCANDO
const handler = async (req: any, res: any) => {
  await promise;
  server(req, res);
};

export default handler;