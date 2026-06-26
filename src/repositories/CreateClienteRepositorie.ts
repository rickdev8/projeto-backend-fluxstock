
import { ClientDTO } from "../interfaces/ClienteDTO";
import { prisma } from "../libs/prismaInstance";

export default async function PushClientDB(Cliente: ClientDTO): Promise<any> {

  const cliente = await prisma.client.create({
    data: {
      nomeCliente: Cliente.nomeCliente.value,
      enderecoCliente: Cliente.enderecoCliente.value.trim() || "Sem endereco",
      telefoneCliente: Cliente.telefoneCliente.value.trim() || "Sem telefone",
      perfilCliente:
        Cliente.perfilCliente?.filename ??
        "https://saae.lucasdorioverde.mt.gov.br/arquivos/setores/sem_imagem_avatar.png",
      cepCliente: Cliente.cepCliente.value || "Sem cep",
      deletedAt: false,
    },
  });
  
  return cliente;
}
