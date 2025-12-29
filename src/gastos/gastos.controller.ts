import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { GastosService } from './gastos.service';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UpdateGastoDto } from './dto/update-gasto.dto';

@ApiTags('Gastos')
@Controller('gastos')
export class GastosController {
  constructor(private readonly gastosService: GastosService) {}

  @Get('resumen/mensual')
  @ApiOperation({ summary: 'Obtener totales acumulados del mes actual' })
  async getResumenMensual() {
    return await this.gastosService.getResumenMesActual();
  }
  
  @Post()
  @ApiOperation({ summary: 'Registrar nuevo gasto' })
  create(@Body() createGastoDto: CreateGastoDto) {
    return this.gastosService.create(createGastoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los gastos activos' })
  findAll() {
    return this.gastosService.findAllActive();
  }

  @Get('bus/:busId') // Las rutas específicas van ARRIBA de las rutas con :id genérico
  @ApiOperation({ summary: 'Filtrar gastos por un bus específico' })
  findByBus(@Param('busId') busId: string) {
    return this.gastosService.findByBus(busId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de un gasto por ID' })
  findOne(@Param('id') id: string) {
    return this.gastosService.findOne(id);
  }

  // NUEVO MÉTODO DE ACTUALIZACIÓN
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar información de un gasto por ID' })
  update(@Param('id') id: string, @Body() updateGastoDto: UpdateGastoDto) {
    return this.gastosService.update(id, updateGastoDto);
  }

  @Patch(':id/soft-delete')
  @ApiOperation({ summary: 'Mover gasto a papelera' })
  softDelete(@Param('id') id: string) {
    return this.gastosService.softDelete(id);
  }

  @Delete(':id/hard-delete')
  @ApiOperation({ summary: 'Eliminar definitivamente' })
  hardDelete(@Param('id') id: string) {
    return this.gastosService.hardDelete(id);
  }
}