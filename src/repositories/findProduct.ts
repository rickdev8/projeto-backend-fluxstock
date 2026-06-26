import { prisma } from "../libs/prismaInstance";
import { buildOrderBy } from "../utils/filterProducts";

export interface ParamsProps {
  page: string;
  limit: string;
  value?: string;
}

export default async function FindProduct(
  params: ParamsProps,
  query: any
): Promise<any> {
  const isSearching = query.search && query.search.trim() !== "";

  const page: number = isSearching ? 1 : Number(params.page) || 1;
  const limit: number = Number(params.limit) || 9;

  const order = buildOrderBy(query.filtro);

  const where: any = isSearching
    ? {
        OR: [
          {
            nomeProduto: {
              contains: query.search,
              mode: "insensitive",
            },
          },
          {
            barCode: {
              contains: query.search.trim(),
              mode: "insensitive",
            },
          },
        ],
      }
    : {};

  const total = await prisma.product.count({ where });

  const products = await prisma.product.findMany({
    where,
    orderBy: order,
    skip: (page - 1) * limit,
    take: limit,
  });


  return {
    data: products,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}
