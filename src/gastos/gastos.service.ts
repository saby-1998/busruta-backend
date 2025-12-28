import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gasto } from './schemas/gasto.schema';
import { CreateGastoDto } from './dto/create-gasto.dto';

@Injectable()
export class GastosService {
  constructor(@InjectModel(Gasto.name) private gastoModel: Model<Gasto>) {}

  async create(createGastoDto: CreateGastoDto): Promise<Gasto> {
    const nuevoGasto = new this.gastoModel(createGastoDto);
    return nuevoGasto.save();
  }

  async findAll(): Promise<Gasto[]> {
    // Solo retornamos los que no tienen fecha de borrado (Soft Delete)
    return this.gastoModel.find({ deletedAt: null })
      .populate('bus')
      .populate('ruta')
      .sort({ fecha: -1 })
      .exec();
  }

  async findAllActive(): Promise<Gasto[]> {
  return this.gastoModel.find({ deletedAt: null })
    .populate({
      path: 'bus',
      populate: { path: 'rutaAsignada' } // Populate anidado: Gasto -> Bus -> Ruta
    })
    .exec();
}

  async findOne(id: string): Promise<Gasto> {
    const gasto = await this.gastoModel.findById(id).populate('bus ruta').exec();
    if (!gasto || gasto.deletedAt) throw new NotFoundException('Gasto no encontrado');
    return gasto;
  }

  // Soft Delete
  async softDelete(id: string): Promise<any> {
    const gasto = await this.gastoModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );
    if (!gasto) throw new NotFoundException('Gasto no existe');
    return { message: 'Gasto movido a la papelera', id };
  }

  // Hard Delete
  async hardDelete(id: string): Promise<any> {
    const result = await this.gastoModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Gasto no existe');
    return { message: 'Gasto eliminado permanentemente' };
  }
  async findByBus(busId: string): Promise<Gasto[]> {
  // Buscamos gastos que pertenezcan al busId y que no estén borrados (soft delete)
  const gastos = await this.gastoModel.find({ 
    bus: busId, 
    deletedAt: null 
  })
  .populate('bus')
  .populate('ruta')
  .sort({ fecha: -1 }) // Ordenar por los más recientes primero
  .exec();

  if (!gastos || gastos.length === 0) {
    // Opcional: podrías lanzar un NotFoundException si prefieres
    return []; 
  }

  return gastos;
}
}