-- DropForeignKey
ALTER TABLE "Projeto" DROP CONSTRAINT "Projeto_cliente_id_fkey";

-- DropForeignKey
ALTER TABLE "TelefoneCliente" DROP CONSTRAINT "TelefoneCliente_cliente_id_fkey";

-- AddForeignKey
ALTER TABLE "TelefoneCliente" ADD CONSTRAINT "TelefoneCliente_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;
