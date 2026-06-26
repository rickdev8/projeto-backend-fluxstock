import { Product } from "../interfaces/Product";
import { prisma } from "../libs/prismaInstance";

export default async function EditProductQuantityRepositorie(
  iD: any,
  data: number
): Promise<Product> {
  const product = await prisma.product.update({
    where: { id: iD },
    data: {
      quantidade: data,
    },
  });


  return product;
}
