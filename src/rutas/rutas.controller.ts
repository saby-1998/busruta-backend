import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RutasService } from './rutas.service';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Rutas')
@Controller('rutas')
export class RutasController {
  constructor(private readonly rutasService: RutasService) {}

  @Post()
  create(@Body() createRutaDto: CreateRutaDto) {
    return this.rutasService.create(createRutaDto);
  }

  @Get()
  findAll() {
    return this.rutasService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rutasService.remove(id);
  }
}