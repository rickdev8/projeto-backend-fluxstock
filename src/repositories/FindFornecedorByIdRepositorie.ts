import { SupplierDTO } from "../interfaces/SupplierDTO";
import { prisma } from "../libs/prismaInstance";

export default async function FindFornecedorByIdService(
  Id: any
): Promise<SupplierDTO[]> {
 
  const fornecedor = await prisma.suplier.findMany({
    where: {
      idFornecedor: Id.id,
    },
  });
 
  if (!fornecedor) {
    throw new Error("Fornecedor não encontrado");
  }

  return fornecedor;
}
