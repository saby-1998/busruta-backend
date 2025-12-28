import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
class OtroGasto {
  @Prop({ required: true })
  desc: string;

  @Prop({ required: true, default: 0 })
  valor: number;
}

@Schema({ timestamps: true })
export class Gasto extends Document {
// RELACIÓN: El gasto pertenece a un Bus específico
  @Prop({ type: Types.ObjectId, ref: 'Bus', required: true })
  bus: Types.ObjectId;

  // Opcional: Guardar la ruta en el momento del gasto por si el bus cambia de ruta luego
  @Prop({ type: Types.ObjectId, ref: 'Ruta' })
  ruta: Types.ObjectId;

  @Prop({ required: true })
  chofer: string;

  @Prop({ required: true })
  fecha: Date;

  @Prop({ default: 0 })
  kmInicial: number;

  @Prop({ default: 0 })
  kmFinal: number;

  @Prop({ required: true, default: 0 })
  recaudacionTotal: number;

  // Gastos fijos (del formulario)
  @Prop({ default: 0 }) diesel: number;
  @Prop({ default: 0 }) valorChofer: number;
  @Prop({ default: 0 }) valorOficial: number;
  @Prop({ default: 0 }) alimentacion: number;
  @Prop({ default: 0 }) peajes: number;
  @Prop({ default: 0 }) parqueo: number;
  @Prop({ default: 0 }) depositoCia: number;
  @Prop({ default: 0 }) multas: number;
  @Prop({ default: 0 }) faltantes: number;
  @Prop({ default: 0 }) recaudacionPrestamo: number;

  // Lista dinámica
  @Prop({ type: [OtroGasto], default: [] })
  otrosGastosList: OtroGasto[];

  @Prop({ required: true, default: 0 })
  totalGastos: number;

  @Prop({ required: true, default: 0 })
  valorNeto: number;

  @Prop({ default: null })
  deletedAt: Date | null;
}

export const GastoSchema = SchemaFactory.createForClass(Gasto);