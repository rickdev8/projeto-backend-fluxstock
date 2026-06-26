import { prisma } from "../libs/prismaInstance";

export default async function DeleteProduct(id: string): Promise<any> {
  const product = await prisma.product.delete({
    where: {
      id: id,
    },
  });

  return product;
}
