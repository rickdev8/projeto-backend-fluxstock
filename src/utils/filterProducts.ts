import { Prisma } from "@prisma/client";

export function buildOrderBy(
  filtro?: string
): Prisma.ProductOrderByWithRelationInput | undefined {
  switch (filtro) {
    case "MaiorQuantidade":
      return { quantidade: "desc" as Prisma.SortOrder };

    case "MenorQuantidade":
      return { quantidade: "asc" as Prisma.SortOrder };

    case "MaiorPreco":
      return { preco: "desc" as Prisma.SortOrder };

    case "MenorPreco":
      return { preco: "asc" as Prisma.SortOrder };

    case "NomeAZ":
      return { nomeProduto: "asc" as Prisma.SortOrder };

    case "NomeZA":
      return { nomeProduto: "desc" as Prisma.SortOrder };

    default:
      return undefined; 
  }
}