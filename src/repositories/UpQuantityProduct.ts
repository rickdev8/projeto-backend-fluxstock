import { prisma } from "../libs/prismaInstance";
import { Product } from "../interfaces/Product";

export default async function UpQuantity(produto: Product): Promise<any> {
  const product = await prisma.product.update({
    where: {
      id: produto.id,
    },
    data: {
      quantidade: {
        increment: produto.quantidade,
      },
    },
  });

  if (!product) {
    throw new Error("Produto não encontrado");
  }

  return product;
}
