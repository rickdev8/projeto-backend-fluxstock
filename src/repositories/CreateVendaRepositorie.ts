import { Sales } from "@prisma/client";
import { prisma } from "../libs/prismaInstance";

export default async function CreateNewVenda(
  paymentMethod: string,
  total: number,
  clientId: string,
  statusPagamento: string
): Promise<Sales> {
  
  const sale = await prisma.sales.create({
    data: {
      paymentMethod,
      total,
      clientId,
      statusPagamento,
      valorParcial: total,
    },
  });

  return sale;
}