import { ClientDTO } from "../interfaces/ClienteDTO";
import { prisma } from "../libs/prismaInstance";

export default async function FindClientByIdService(
  id: string
): Promise<ClientDTO[]> {
  const client = await prisma.client.findMany({
    where: {
      id,
      deletedAt: false,
    },
    include: {
      sales: true,
    },
  });

  if (client.length === 0) {
    throw new Error("Cliente não encontrado");
  }

  return client;
}