import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GastosModule } from './gastos/gastos.module';


@Module({
  imports: [// Aquí es donde sucede la magia de Atlas
    MongooseModule.forRoot('mongodb+srv://sabigabyok_db_user:NAzuYU2V6N71vtI4@cluster0.q3qzc5p.mongodb.net/?appName=Cluster0'),
    GastosModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
