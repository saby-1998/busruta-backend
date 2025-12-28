import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GastosController } from './gastos.controller';
import { GastosService } from './gastos.service';
import { Gasto, GastoSchema } from './schemas/gasto.schema';

@Module({
  imports: [
    // Registramos el esquema "Gasto" para que Mongoose lo reconozca
    MongooseModule.forFeature([
      { name: Gasto.name, schema: GastoSchema }
    ]),
  ],
  controllers: [GastosController], // Escucha las peticiones HTTP (Swagger)
  providers: [GastosService],      // Contiene la lógica de negocio y DB
  exports: [GastosService],        // Opcional: por si quieres usarlo en otro módulo
})
export class GastosModule {}