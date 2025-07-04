import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/plugins/database/services/prisma.service';
import {
  ClientResponseDto,
  SearchClientsResponseDto,
} from './dto/resp-client.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto): Promise<ClientResponseDto> {
    await this._validateClient(createClientDto);

    const data = this._mapClientDtoToPrismaData(createClientDto, 'create');

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

  async findAll(): Promise<SearchClientsResponseDto> {
    try {
      const clients = await this.prisma.cliente.findMany({
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
        clients: clients.map((client) => ({
          ...client,
          complemento: client.complemento ?? undefined,
          telefones: client.telefones.map((t) => t.numero),
        })),
      };
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar clientes');
    }
  }

  async findOne(id: string): Promise<ClientResponseDto> {
    try {
      const cliente = await this.prisma.cliente.findFirst({
        where: { id },
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

      if (!cliente) {
        throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
      }

      return {
        ...cliente,
        complemento: cliente.complemento ?? undefined,
        telefones: cliente.telefones.map((t) => t.numero),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao buscar cliente: ${error.message}`,
      );
    }
  }

  async update(
    id: string,
    updateClientDto: UpdateClientDto,
  ): Promise<ClientResponseDto> {
    try {
      await this.findOne(id);

      const data = this._mapClientDtoToPrismaData(updateClientDto, 'update');

      const cliente = await this.prisma.cliente.update({
        where: { id },
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
        ...cliente,
        complemento: cliente.complemento ?? undefined,
        telefones: cliente.telefones.map((t) => t.numero),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao atualizar cliente: ${error.message}`,
      );
    }
  }

  async remove(id: string) {
    try {
      const cliente = await this.findOne(id);

      if (!cliente) {
        throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
      }

      await this.prisma.cliente.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao remover cliente: ${error.message}`,
      );
    }
  }

  private _mapClientDtoToPrismaData(
    dto: CreateClientDto | UpdateClientDto,
    mode: 'create' | 'update',
  ) {
    const { telefones, ...rest } = dto;

    const data: any = {
      ...rest,
    };

    if ('complemento' in rest) {
      data.complemento = rest.complemento ?? undefined;
    }

    if (telefones) {
      data.telefones =
        mode === 'create'
          ? {
              createMany: {
                data: telefones.map((numero) => ({ numero })),
              },
            }
          : {
              create: telefones.map((numero) => ({ numero })),
            };
    }

    return data;
  }

  private async _validateClient(client: CreateClientDto) {
    const cliente = await this.prisma.cliente.findUnique({
      where: {
        email: client.email,
      },
    });

    if (cliente) {
      throw new ConflictException(
        `Cliente com email ${client.email} já existe.`,
      );
    }
  }
}
