import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BusesController } from './buses.controller';
import { BusesService } from './buses.service';
import { Bus, BusSchema } from './schemas/bus.schema';

@Module({
  imports: [
    // Registra el modelo en Mongoose para este módulo
    MongooseModule.forFeature([{ name: Bus.name, schema: BusSchema }]),
  ],
  controllers: [BusesController],
  providers: [BusesService],
  exports: [BusesService], // Permite que otros módulos usen este servicio
})
export class BusesModule {}