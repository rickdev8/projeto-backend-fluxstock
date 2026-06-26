import { prisma } from "../libs/prismaInstance";

export default async function CreateNewSalesProduct(
  productId: string,
  total: number,
  quantity: number,
  salesId: any
): Promise<any> {
  const product = await prisma.salesProduct.create({
    data: {
      quantity: quantity,
      total: total,
      productId: productId,
      salesId: salesId,
    },
  });
 

  if (!product) {
    throw new Error("Erro no repositorie de Vendas");
  }

  return product;
}
