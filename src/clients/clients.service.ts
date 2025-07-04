import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/plugins/database/services/prisma.service';
import { ClientResponseDto } from './dto/resp-client.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto): Promise<ClientResponseDto> {

    const data = this._mapCreateClientDtoToPrismaData(createClientDto);
    
    try {
      const cliente = await this.prisma.cliente.create({
        data,
        select: {
          id: true,
          nome_completo: true,
          email: true,
          cep: true,
          logradouro: true,
          cidade: true,
          uf: true,
          bairro: true,
          numero: true,
          complemento: true,
          telefones: {
            select: {
              numero: true,
            },
          },
        },
      });

      return {
        id: cliente.id,
        nome_completo: cliente.nome_completo,
        email: cliente.email,
        cep: cliente.cep,
        logradouro: cliente.logradouro,
        cidade: cliente.cidade,
        uf: cliente.uf,
        bairro: cliente.bairro,
        numero: cliente.numero,
        complemento: cliente.complemento ?? undefined,
        telefones: cliente.telefones.map((t) => t.numero),
      };
    } catch (error) {
      throw new Error(`Erro ao criar cliente: ${error.message}`);
    }
  }

  findAll() {
    return `This action returns all clients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }

  private _mapCreateClientDtoToPrismaData(dto: CreateClientDto) {
    const { telefones, ...rest } = dto;
    return {
      ...rest,
      telefones: {
        createMany: {
          data: telefones.map((numero) => ({ numero })),
        },
      },
    };
  }
}
