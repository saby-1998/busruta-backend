import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gasto } from './schemas/gasto.schema';
import { CreateGastoDto } from './dto/create-gasto.dto';

@Injectable()
export class GastosService {
  // Inyectamos el modelo de Mongoose definido en el schema
  constructor(
    @InjectModel(Gasto.name) private gastoModel: Model<Gasto>
  ) {}

  async create(createGastoDto: CreateGastoDto): Promise<Gasto> {
    const nuevoGasto = new this.gastoModel(createGastoDto);
    return nuevoGasto.save();
  }

  async findAll(): Promise<Gasto[]> {
    // Retorna todos los gastos ordenados por los más recientes
    return this.gastoModel.find().sort({ createdAt: -1 }).exec();
  }

  async findByTipo(tipo: string): Promise<Gasto[]> {
    return this.gastoModel.find({ tipo }).exec();
  }

  // Método para el Dashboard de Wlady: Sumar totales
  async getResumen() {
    const gastos = await this.gastoModel.find().exec();
    const total = gastos.reduce((sum, item) => sum + item.monto, 0);
    
    return {
      totalAcumulado: total,
      cantidadRegistros: gastos.length,
      unidad: 'Unidad #45'
    };
  }
}