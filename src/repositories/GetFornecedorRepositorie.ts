import { prisma } from "../libs/prismaInstance";

export default async function GetFornecedor(
  params: any,
  query: any
): Promise<any> {
  const limit = Number(params.limit) || 10;
  const search = query.search;

  const page: number = query.search ? 1 : Number(params.page) || 1;

  const where: any = search
    ? {
        nomeFornecedor: {
          contains: search,
          mode: "insensitive",
        },
      }
    : {};

  const total = await prisma.suplier.count();

  const fornecedores = await prisma.suplier.findMany({
    where,
    skip: query.search == "" ? (page - 1) * limit : 0,
    take: query.search == "" ? limit : 7,
  });


  return {
    fornecedores,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}
