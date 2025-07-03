import { ApiProperty } from "@nestjs/swagger";

export class ClientResponseDto {
    @ApiProperty({ example: '00e8fcd5-ccec-4c56-998a-0d5a5396154e' })
    readonly id: string;

    @ApiProperty({ example: 'Heder Moreira David' })
    readonly nome_completo: string;

    @ApiProperty({ example: 'hedermd6@gmail.com' })
    readonly email: string;

    @ApiProperty({ example: '45028-610' })
    readonly cep: string;

    @ApiProperty({ example: 'Avenida Olívia Flores' })
    readonly logradouro: string;

    @ApiProperty({ example: 'Vitória da Conquista' })
    readonly cidade: string;

    @ApiProperty({ example: 'BA' })
    readonly uf: string;

    @ApiProperty({ example: 'Candeias' })
    readonly bairro: string;

    @ApiProperty({ example: '123' })
    readonly numero: string;

    @ApiProperty({ example: 'Apto 101', required: false })
    readonly complemento?: string;
}

export class CreateClientResponseDto {
    @ApiProperty({ example: 201 })
    readonly statusCode: number;

    @ApiProperty({ example: 'Cliente criado com sucesso!' })
    readonly message: string;

    @ApiProperty({ type: ClientResponseDto })
    readonly client: ClientResponseDto;
}

export class SearchClientsResponseDto {
    @ApiProperty({ type: [ClientResponseDto]})
    readonly clients: ClientResponseDto[];
}

export class UpdateClientResponseDto {
    @ApiProperty({ example: 200 })
    readonly statusCode: number;

    @ApiProperty({ example: 'Cliente atualizado com sucesso!' })
    readonly message: string;

    @ApiProperty({ type: ClientResponseDto })
    readonly client: ClientResponseDto
}

export class DeleteClientResponseDto {
    @ApiProperty({ example: 200 })
    readonly statusCode: number;

    @ApiProperty({ example: 'Cliente removido com sucesso!' })
    readonly message: string;
}