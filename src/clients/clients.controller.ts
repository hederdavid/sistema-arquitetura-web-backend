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
  findAll() {
    return this.clientsService.findAll();
  }

  @ApiSearchOperation(
    {
      summary: 'Busca um cliente por ID',
      description: 'Retorna os detalhes de um cliente específico pelo ID.',
    },
    CreateClientResponseDto,
  )
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
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
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
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
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
