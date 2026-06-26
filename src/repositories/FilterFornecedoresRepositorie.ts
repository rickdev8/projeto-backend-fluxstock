import { prisma } from "../libs/prismaInstance";

export const FilterFornecedorRepositorie = async (value: any) => {
  
  const totalFornecedor = await prisma.suplier.count();

  const fornecedor = await prisma.suplier.findMany({
    where: {
      nomeFornecedor: {
        contains: value.search.trim(),
      },
    },
  });

  return {
    fornecedor,
    totalFornecedor,
  };
};
