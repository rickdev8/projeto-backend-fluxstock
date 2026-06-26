import { prisma} from "../libs/prismaInstance";

export default async function EditClientRepositorie(
  iD: any,
  data: any
): Promise<any> {
  const client = await prisma.client.update({
    where: { id: iD.id },
    data: {
      cepCliente: data.cepCliente.toString(),
      enderecoCliente: data.enderecoCliente,
      nomeCliente: data.nomeCliente,
      telefoneCliente: data.telefoneCliente,
    },
  });


  return client;
}
