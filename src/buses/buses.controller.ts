import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { BusesService } from './buses.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Buses')
@Controller('buses')
export class BusesController {
  constructor(private readonly busesService: BusesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un bus vinculado a una Ruta ID' })
  create(@Body() createBusDto: CreateBusDto) {
    return this.busesService.create(createBusDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar buses con su información de ruta' })
  findAll() {
    // El servicio debe usar .populate('rutaAsignada')
    return this.busesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.busesService.findOne(id);
  }

  @Patch(':id/desactivar')
  @ApiOperation({ summary: 'Desactivación lógica del bus' })
  remove(@Param('id') id: string) {
    return this.busesService.remove(id);
  }
}