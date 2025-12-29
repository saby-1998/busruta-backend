import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gasto } from './schemas/gasto.schema';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class GastosService {
  constructor(@InjectModel(Gasto.name) private gastoModel: Model<Gasto>) {}

async create(createGastoDto: CreateGastoDto): Promise<Gasto> {
    // Validamos que el ID del bus tenga el formato correcto de MongoDB
    if (!isValidObjectId(createGastoDto.bus)) {
      throw new BadRequestException('El ID del bus proporcionado no es válido.');
    }

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
    .populate('bus') // Solo hacemos populate del Bus
    .sort({ createdAt: -1 }) // Opcional: ver los últimos registros primero
    .exec();
}

async findOne(id: string): Promise<Gasto> {
  // 1. Validar formato antes de buscar
  if (!isValidObjectId(id)) {
    throw new BadRequestException(`El ID "${id}" no tiene un formato válido de base de datos.`);
  }

  const gasto = await this.gastoModel.findById(id).populate('bus').exec();
  
  if (!gasto) {
    throw new NotFoundException('Gasto no encontrado.');
  }
  
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
    // Validar el ID del bus enviado por URL
    if (!isValidObjectId(busId)) {
      throw new BadRequestException(`El ID del bus "${busId}" es inválido.`);
    }

    return this.gastoModel.find({ bus: busId, deletedAt: null })
      .populate('bus')
      .exec();
  }
  async update(id: string, updateGastoDto: UpdateGastoDto) {
    const gastoActualizado = await this.gastoModel
      .findByIdAndUpdate(
        id, 
        { $set: updateGastoDto }, 
        { new: true } // Retorna el objeto modificado
      )
      .populate('bus') // Opcional: para que el frontend reciba el objeto bus actualizado
      .exec();

    if (!gastoActualizado) {
      throw new NotFoundException(`Gasto con ID ${id} no encontrado`);
    }

    return gastoActualizado;
  }
}