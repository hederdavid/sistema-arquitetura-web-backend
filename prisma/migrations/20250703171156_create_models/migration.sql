-- CreateEnum
CREATE TYPE "ProjetoStatus" AS ENUM ('PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "ExecucaoTarefaStatus" AS ENUM ('PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO');

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL,
    "nome_completo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TelefoneCliente" (
    "id" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,

    CONSTRAINT "TelefoneCliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarefa" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subprojeto" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "Subprojeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubprojetoTarefa" (
    "id" TEXT NOT NULL,
    "subprojeto_id" TEXT NOT NULL,
    "tarefa_id" TEXT NOT NULL,

    CONSTRAINT "SubprojetoTarefa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projeto" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_entrega_estimada" TIMESTAMP(3),
    "data_entrega_final" TIMESTAMP(3),
    "status" "ProjetoStatus" NOT NULL,
    "cliente_id" TEXT NOT NULL,

    CONSTRAINT "Projeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjetoSubprojeto" (
    "id" TEXT NOT NULL,
    "projeto_id" TEXT NOT NULL,
    "subprojeto_id" TEXT NOT NULL,

    CONSTRAINT "ProjetoSubprojeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExecucaoTarefa" (
    "id" TEXT NOT NULL,
    "tarefa_id" TEXT NOT NULL,
    "subprojeto_id" TEXT NOT NULL,
    "projeto_id" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3),
    "status" "ExecucaoTarefaStatus" NOT NULL,

    CONSTRAINT "ExecucaoTarefa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- AddForeignKey
ALTER TABLE "TelefoneCliente" ADD CONSTRAINT "TelefoneCliente_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubprojetoTarefa" ADD CONSTRAINT "SubprojetoTarefa_subprojeto_id_fkey" FOREIGN KEY ("subprojeto_id") REFERENCES "Subprojeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubprojetoTarefa" ADD CONSTRAINT "SubprojetoTarefa_tarefa_id_fkey" FOREIGN KEY ("tarefa_id") REFERENCES "Tarefa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjetoSubprojeto" ADD CONSTRAINT "ProjetoSubprojeto_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjetoSubprojeto" ADD CONSTRAINT "ProjetoSubprojeto_subprojeto_id_fkey" FOREIGN KEY ("subprojeto_id") REFERENCES "Subprojeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExecucaoTarefa" ADD CONSTRAINT "ExecucaoTarefa_tarefa_id_fkey" FOREIGN KEY ("tarefa_id") REFERENCES "Tarefa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExecucaoTarefa" ADD CONSTRAINT "ExecucaoTarefa_subprojeto_id_fkey" FOREIGN KEY ("subprojeto_id") REFERENCES "Subprojeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExecucaoTarefa" ADD CONSTRAINT "ExecucaoTarefa_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
