import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

// CAMBIA ESTA LÍNEA:
// En lugar de import * as express...
const express = require('express');
import { Express } from 'express-serve-static-core'; // Opcional, solo para tipos

// Y esta línea ahora funcionará sin errores:
const server = express(); 

export async function createServer() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('API Control de Gastos - Wlady')
    .setDescription('Backend para la gestión de gastos de la Unidad #45')
    .setVersion('1.0')
    .addTag('gastos')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);

  // Swagger con CDNs para Vercel
SwaggerModule.setup('api', app, document, {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
    ],
  });
app.useGlobalPipes(new ValidationPipe());
  await app.init();
  return server;
}

export default async (req: any, res: any) => {
  const app = await createServer();
  app(req, res);
};

if (process.env.NODE_ENV !== 'production') {
  async function bootstrapLocal() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
    console.log(`🚀 Local en: http://localhost:3000/api`);
  }
  bootstrapLocal();
}