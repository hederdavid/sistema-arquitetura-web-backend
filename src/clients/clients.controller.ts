import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Search,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import {
  ClientResponseDto,
  CreateClientResponseDto,
  DeleteClientResponseDto,
  SearchClientsResponseDto,
  UpdateClientResponseDto,
} from './dto/resp-client.dto';
import {
  ApiCreateOperation,
  ApiDeleteOperation,
  ApiSearchOperation,
  ApiUpdateOperation,
} from 'src/common/documentation';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @ApiCreateOperation(
    {
      summary: 'Cria um novo cliente',
      description: 'Cria um novo cliente e retorna o cliente criado.',
    },
    CreateClientResponseDto,
  )
  @Post()
  async create(@Body() createClientDto: CreateClientDto): Promise<CreateClientResponseDto> {
    const client = await this.clientsService.create(createClientDto);
    return {
      statusCode: 201,
      message: 'Cliente criado com sucesso!',
      client,
    };
  }

  @ApiSearchOperation(
    {
      summary: 'Busca todos os clientes',
      description: 'Retorna uma lista de todos os clientes cadastrados.',
    },
    SearchClientsResponseDto,
  )
  @Get()
  async findAll(): Promise<SearchClientsResponseDto> {
    return await this.clientsService.findAll();
  }

  @ApiSearchOperation(
    {
      summary: 'Busca um cliente por ID',
      description: 'Retorna os detalhes de um cliente específico pelo ID.',
    },
    ClientResponseDto,
  )
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ClientResponseDto> {
    return await this.clientsService.findOne(id);
  }

  @ApiUpdateOperation(
    {
      summary: 'Atualiza um cliente existente',
      description:
        'Atualiza os dados de um cliente específico pelo ID e retorna o cliente atualizado.',
    },
    UpdateClientResponseDto,
  )
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto): Promise<UpdateClientResponseDto> {
    const cliente = await this.clientsService.update(id, updateClientDto);

    return {
      statusCode: 200,
      message: 'Cliente atualizado com sucesso!',
      client: cliente,
    }
  }

  @ApiDeleteOperation(
    {
      summary: 'Remove um cliente',
      description:
        'Remove um cliente específico pelo ID e retorna uma confirmação.',
    },
    DeleteClientResponseDto,
  )
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteClientResponseDto> {
    await this.clientsService.remove(id);

    return {
      statusCode: 200,
      message: 'Cliente removido com sucesso!',
    }
  }
}
