import { prisma } from "../libs/prismaInstance";

export default async function DeleteClientRepositorie(iD: any): Promise<any> {
  const client = await prisma.client.update({
    where: {
      id: iD.id,
    },
    data: {
      deletedAt: true,
    },
  });
 
  return client;
}
