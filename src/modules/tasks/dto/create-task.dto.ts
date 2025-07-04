import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty({message: 'O nome da tarefa é obrigatório.'})
    @IsString({message: 'O nome da tarefa deve ser uma string.'})
    readonly nome: string;

    @IsOptional()
    @IsString({message: 'A descrição deve ser uma string.'})
    readonly descricao?: string;
}

