import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GastosController } from './gastos.controller';
import { GastosService } from './gastos.service';
import { Gasto, GastoSchema } from './schemas/gasto.schema';
import { BusesModule } from '../buses/buses.module'; // Importamos para futuras validaciones
import { RutasModule } from '../rutas/rutas.module';

@Module({
  imports: [
    // Registro del esquema de Gastos en la base de datos
    MongooseModule.forFeature([
      { name: Gasto.name, schema: GastoSchema }
    ]),
    // Importamos estos módulos por si el Service necesita usar 
    // los servicios de Bus o Ruta para validar que el ID exista
    BusesModule,
    RutasModule,
  ],
  controllers: [GastosController],
  providers: [GastosService],
  exports: [GastosService], // Por si otro módulo necesita consultar gastos
})
export class GastosModule {}