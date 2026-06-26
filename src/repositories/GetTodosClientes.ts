import { prisma } from "../libs/prismaInstance";

export const GetTodosClientes = async (query: any) => {
  const clientes = await prisma.client.findMany({
    where: {
      nomeCliente: {
        startsWith: query.search,
      },
      deletedAt: false,
    },
  });
  return clientes;
};
