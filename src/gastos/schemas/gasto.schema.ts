import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Crea automáticamente createdAt y updatedAt
export class Gasto extends Document {
  
  @Prop({ required: true })
  descripcion: string;

  @Prop({ required: true, type: Number })
  monto: number;

  @Prop({ 
    required: true, 
    enum: ['diario', 'mensual', 'anual'],
    index: true 
  })
  tipo: string;

  @Prop({ required: true })
  categoria: string; // Ej: 'Combustible', 'Seguro', 'Mantenimiento'

  @Prop({ default: Date.now })
  fechaGasto: Date;

  @Prop()
  notas: string;

  @Prop({ default: 'Unidad #45' })
  unidad: string;
}

export const GastoSchema = SchemaFactory.createForClass(Gasto);