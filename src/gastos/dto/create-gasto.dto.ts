import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGastoDto {
  @ApiProperty({ example: 'Cambio de aceite', description: 'Nombre del gasto' })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({ example: 45.50, description: 'Monto en dólares' })
  @IsNumber()
  @IsNotEmpty()
  monto: number;

  @ApiProperty({ 
    enum: ['diario', 'mensual', 'anual'], 
    example: 'diario' 
  })
  @IsEnum(['diario', 'mensual', 'anual'])
  tipo: string;

  @ApiProperty({ example: 'Mantenimiento', description: 'Categoría del gasto' })
  @IsString()
  @IsNotEmpty()
  categoria: string;

  @ApiProperty({ required: false, example: 'Se compró en la gasolinera de la esquina' })
  @IsString()
  @IsOptional()
  notas?: string;
}