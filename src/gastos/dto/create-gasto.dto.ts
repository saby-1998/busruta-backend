import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsOptional, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

class OtroGastoDto {
  @ApiProperty() @IsString() desc: string;
  @ApiProperty() @IsNumber() valor: number;
}

export class CreateGastoDto {

    @ApiProperty({ description: 'ID del Bus (ObjectId de MongoDB)' })
  @IsString()
  bus: string; 

  @ApiProperty({ description: 'ID de la Ruta' })
  @IsString()
  ruta: string;
  @ApiProperty() @IsString() chofer: string;
  @ApiProperty() @IsDateString() fecha: string;
  @ApiProperty() @IsNumber() kmInicial: number;
  @ApiProperty() @IsNumber() kmFinal: number;
  @ApiProperty() @IsNumber() recaudacionTotal: number;

  @ApiProperty() @IsOptional() @IsNumber() diesel: number;
  @ApiProperty() @IsOptional() @IsNumber() valorChofer: number;
  @ApiProperty() @IsOptional() @IsNumber() valorOficial: number;
  @ApiProperty() @IsOptional() @IsNumber() alimentacion: number;
  @ApiProperty() @IsOptional() @IsNumber() peajes: number;
  @ApiProperty() @IsOptional() @IsNumber() parqueo: number;
  @ApiProperty() @IsOptional() @IsNumber() depositoCia: number;
  @ApiProperty() @IsOptional() @IsNumber() multas: number;
  @ApiProperty() @IsOptional() @IsNumber() faltantes: number;
  @ApiProperty() @IsOptional() @IsNumber() recaudacionPrestamo: number;

  @ApiProperty({ type: [OtroGastoDto] })
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => OtroGastoDto)
  otrosGastosList: OtroGastoDto[];

  @ApiProperty() @IsNumber() totalGastos: number;
  @ApiProperty() @IsNumber() valorNeto: number;
}