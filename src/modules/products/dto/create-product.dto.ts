import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { IProduct } from 'src/core/enum';
import { EProductTalles } from 'src/core/interface';

export class CreateProductDto implements Omit<IProduct, 'id'> {
  @ApiProperty()
  @IsString()
  codigo: string;

  @ApiProperty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsString()
  categoria: string;

  @ApiProperty()
  @IsNumber()
  precio: number;

  @ApiProperty()
  @IsEnum(EProductTalles)
  talle: EProductTalles;
}
