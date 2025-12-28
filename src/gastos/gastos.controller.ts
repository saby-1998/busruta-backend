import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { GastosService } from './gastos.service';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Gastos')
@Controller('gastos')
export class GastosController {
  constructor(private readonly gastosService: GastosService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar gasto usando IDs de Bus y Ruta' })
  create(@Body() createGastoDto: CreateGastoDto) {
    // El DTO debe recibir "bus": "ID_DE_MONGO" y "ruta": "ID_DE_MONGO"
    return this.gastosService.create(createGastoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Historial de gastos con toda la info de Bus y Ruta' })
  findAll() {
    return this.gastosService.findAllActive();
  }

  @Get(':id') // 2. Ruta con parámetro: DEBE IR AL FINAL
  findOne(@Param('id') id: string) {
    return this.gastosService.findOne(id);
  }

  @Get('bus/:busId')
  @ApiOperation({ summary: 'Filtrar gastos por un bus específico' })
  findByBus(@Param('busId') busId: string) {
    return this.gastosService.findByBus(busId);
  }

  @Patch(':id/soft-delete')
  @ApiOperation({ summary: 'Mover gasto a papelera (Soft Delete)' })
  softDelete(@Param('id') id: string) {
    return this.gastosService.softDelete(id);
  }

  @Delete(':id/hard-delete')
  @ApiOperation({ summary: 'Eliminar definitivamente' })
  hardDelete(@Param('id') id: string) {
    return this.gastosService.hardDelete(id);
  }
}