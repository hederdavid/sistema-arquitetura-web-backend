import {
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
  readonly nome_completo: string;

  @IsEmail({}, { message: 'Email inválido' })
  readonly email: string;

  @IsString()
  @Matches(/^\d{5}-\d{3}$/, { message: 'CEP deve estar no formato 00000-000' })
  readonly cep: string;

  @IsString()
  @IsNotEmpty()
  readonly logradouro: string;

  @IsString()
  @IsNotEmpty()
  readonly cidade: string;

  @IsString()
  @Matches(/^[A-Z]{2}$/, { message: 'UF deve conter 2 letras maiúsculas' })
  readonly uf: string;

  @IsString()
  @IsNotEmpty()
  readonly bairro: string;

  @IsString()
  @IsNotEmpty()
  readonly numero: string;

  @IsString()
  @IsOptional()
  readonly complemento?: string;
}
