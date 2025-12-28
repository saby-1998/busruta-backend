import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Configurar validaciones globales
  app.useGlobalPipes(new ValidationPipe());

  // 2. Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('API Control de Gastos - Wlady')
    .setDescription('Servicios para registrar gastos diarios, mensuales y anuales de la Unidad #45')
    .setVersion('1.0')
    .addTag('gastos')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // URL: http://localhost:3000/api/docs

  await app.listen(3000);
}
bootstrap();