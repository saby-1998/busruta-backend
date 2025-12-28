import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuraciones globales
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  // Swagger estándar (Render no necesita los CDNs, pero puedes dejarlos por seguridad)
  const config = new DocumentBuilder()
    .setTitle('API Control de Gastos - Wlady')
    .setDescription('Backend para la gestión de gastos de la Unidad #45')
    .setVersion('1.0')
    .addTag('gastos')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // IMPORTANTE: Render usa la variable de entorno PORT
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Servidor corriendo en puerto: ${port}`);
}
bootstrap();