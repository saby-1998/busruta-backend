import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateRutaDto {
  @ApiProperty({ example: 'Marín - Carcelén' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 2.50 })
  @IsNumber()
  tarifaPeajeSugerida: number;
}