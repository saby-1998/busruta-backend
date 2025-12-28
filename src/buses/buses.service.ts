import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bus } from './schemas/bus.schema';
import { CreateBusDto } from './dto/create-bus.dto';

@Injectable()
export class BusesService {
  constructor(@InjectModel(Bus.name) private busModel: Model<Bus>) {}

  async create(createBusDto: CreateBusDto): Promise<Bus> {
    return new this.busModel(createBusDto).save();
  }

  async findAll(): Promise<Bus[]> {
  return this.busModel.find({ activo: true })
    .populate('rutaAsignada') // Si es null, no pasa nada, devuelve null
    .exec();
}

  async findOne(id: string): Promise<Bus> {
    return this.busModel.findById(id).exec();
  }

  async remove(id: string) {
    return this.busModel.findByIdAndUpdate(id, { activo: false });
  }
}