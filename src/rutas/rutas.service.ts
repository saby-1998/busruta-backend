import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ruta } from './schemas/ruta.schema';
import { CreateRutaDto } from './dto/create-ruta.dto';

@Injectable()
export class RutasService {
  constructor(@InjectModel(Ruta.name) private rutaModel: Model<Ruta>) {}

  async create(createRutaDto: CreateRutaDto): Promise<Ruta> {
    return new this.rutaModel(createRutaDto).save();
  }

  async findAll(): Promise<Ruta[]> {
    return this.rutaModel.find({ activa: true }).exec();
  }

  async remove(id: string) {
    return this.rutaModel.findByIdAndUpdate(id, { activa: false });
  }
}