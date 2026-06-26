import { SupplierDTO } from "../interfaces/SupplierDTO";
import { prisma } from "../libs/prismaInstance";

export default async function DeleteFornecedorRepositorie(
  id: string
): Promise<SupplierDTO> {
  const fornecedor = await prisma.suplier.delete({
    where: {
      idFornecedor: id,
    },
  });

  return fornecedor;
}