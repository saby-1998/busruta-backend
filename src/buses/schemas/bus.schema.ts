import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Bus extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, unique: true })
  numeroUnidad: string;

  @Prop()
  placa: string;

  @Prop()
  cooperativa: string;

  // RELACIÓN OPCIONAL: quitamos required: true
  @Prop({ type: Types.ObjectId, ref: 'Ruta', default: null })
  rutaAsignada: Types.ObjectId | null;

  @Prop({ default: true })
  activo: boolean;
}
export const BusSchema = SchemaFactory.createForClass(Bus);