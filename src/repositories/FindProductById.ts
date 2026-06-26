import { prisma } from "../libs/prismaInstance";
import { Product } from "../interfaces/Product";

export default async function FindProductById(
  id: string[]
): Promise<Product[]> {
  const product = await prisma.product.findMany({
    where: {
      id: {
        in: id,
      },
    },
  });

  if (!product) {
    throw new Error("Produto não encontrado");
  }

  return product;
}
