import { Sales } from "@prisma/client";
import { Sale } from "../interfaces/Venda";
import { prisma } from "../libs/prismaInstance";

export default async function EditVendaRepositorie(
  id: string,
  data: Sale
): Promise<Sales> {
  const venda = await prisma.sales.update({
    where: {
      id,
    },
    data: {
      paymentMethod: data.paymentMethod,
      statusPagamento: data.statusPagamento,
      total: data.total,
      valorParcial: data.valorParcial,
    },
  });

  return venda;
}