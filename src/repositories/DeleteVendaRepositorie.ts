import { prisma } from "../libs/prismaInstance";

export default async function DeleteVendaRepositorie(id: string): Promise<any> {
  const product = await prisma.sales.delete({
    where: {
      id: id,
    },
  });

  return product;
}
