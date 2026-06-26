import { prisma } from "../libs/prismaInstance";

export default async function EditProductRepositorieId(iD: any): Promise<any> {
  const product = await prisma.product.findMany({
    where: {
      id: iD.id,
    },
  });

  if (!product) {
    throw new Error("Cliente não encontrado");
  }
  return product;
}
