import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBusDto {
  @ApiProperty({ example: 'Rayo Veloz' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: '19' })
  @IsString()
  @IsNotEmpty()
  numeroUnidad: string;

  @ApiProperty({ example: 'PAB7041' })
  @IsString()
  placa: string;

  @ApiProperty({ example: 'Disutransa' })
  @IsString()
  cooperativa: string;

  // Cambiamos a ApiPropertyOptional para que Swagger sepa que no es obligatorio
  @ApiPropertyOptional({ 
    example: '658af...', 
    description: 'ID de la Ruta (opcional)' 
  })
  @IsOptional() // Permite que el campo no venga en el JSON
  @IsString()
  rutaAsignada?: string;
}