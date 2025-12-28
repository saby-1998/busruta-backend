import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Ruta extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ default: 0 })
  tarifaPeajeSugerida: number;

  @Prop({ default: true })
  activa: boolean;
}

export const RutaSchema = SchemaFactory.createForClass(Ruta);