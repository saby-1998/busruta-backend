import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RutasController } from './rutas.controller';
import { RutasService } from './rutas.service';
import { Ruta, RutaSchema } from './schemas/ruta.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ruta.name, schema: RutaSchema }]),
  ],
  controllers: [RutasController],
  providers: [RutasService],
  exports: [RutasService],
})
export class RutasModule {}