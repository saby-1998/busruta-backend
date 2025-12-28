import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GastosService } from './gastos.service';
import { CreateGastoDto } from './dto/create-gasto.dto';

@ApiTags('gastos') // Organiza los servicios bajo este nombre en Swagger
@Controller('gastos')
export class GastosController {
  constructor(private readonly gastosService: GastosService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo gasto (Diario/Mensual/Anual)' })
  @ApiResponse({ status: 201, description: 'El gasto ha sido guardado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  create(@Body() createGastoDto: CreateGastoDto) {
    return this.gastosService.create(createGastoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los gastos registrados' })
  findAll() {
    return this.gastosService.findAll();
  }
}