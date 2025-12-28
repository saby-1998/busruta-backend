import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

// Función compartida para configurar Swagger y Pipes
export async function setupApp(app) {
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('API Gastos Wlady')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('api', app, document, {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
    ],
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await setupApp(app);
  await app.listen(3000);
  console.log('🚀 Local: http://localhost:3000/api');
}

// IMPORTANTE: Solo ejecutar si no es Vercel
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}