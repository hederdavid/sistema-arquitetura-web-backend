import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  @ApiProperty({ example: 'Heder Moreira David' })
  readonly nome_completo: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty()
  @ApiProperty({ example: 'hedermd6@gmail.com' })
  readonly email: string;

  @IsString()
  @Matches(/^\d{5}-\d{3}$/, { message: 'CEP deve estar no formato 00000-000' })
  @IsNotEmpty()
  @ApiProperty({ example: '45028-610' })
  readonly cep: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Avenida Olívia Flores' })
  readonly logradouro: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Vitória da Conquista' })
  readonly cidade: string;

  @IsString()
  @Matches(/^[A-Z]{2}$/, { message: 'UF deve conter 2 letras maiúsculas' })
  @IsNotEmpty()
  @ApiProperty({ example: 'BA' })
  readonly uf: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Candeias' })
  readonly bairro: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123' })
  readonly numero: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Apto 101', required: false })
  readonly complemento?: string | null;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @ApiProperty({
    example: ['(77) 99999-9999', '(77) 88888-8888'],
    description: 'Lista de telefones do cliente',
    type: [String],
  })
  readonly telefones: string[];
}
