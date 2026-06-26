import { prisma } from "../libs/prismaInstance";

export default async function FindVendaByIdRepositorie(iD: any): Promise<any> {
  const sale = await prisma.sales.findUnique({
    where: { id: iD.id },
    include: {
      client: {
        select: {
          nomeCliente: true,
        },
      },
    },
  });

  if (!sale) {
    throw new Error("Venda não encontrada");
  }

  const objectSale = {
    id: sale.id,
    data: sale.data,
    total: sale.total,
    paymentMethod: sale.paymentMethod,
    statusPagamento: sale.statusPagamento,
    nomeCliente: sale.client.nomeCliente,
    valorParcial: sale.valorParcial
  };

  return objectSale;
}
