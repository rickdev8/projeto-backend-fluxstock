import { Prisma } from "@prisma/client";

export function buildVendasQuery(
  filtro?: string
): { where: Prisma.SalesWhereInput; orderBy?: Prisma.SalesOrderByWithRelationInput } {
  const where: Prisma.SalesWhereInput = {
    statusPagamento: {
      in: ["pendente", "pago"],
    },
  };
  
  let orderBy: Prisma.SalesOrderByWithRelationInput | undefined;

  switch (filtro) {
    case "Mais recentes":
      orderBy = { data: "desc" as Prisma.SortOrder };
      break;
    case "Mais antigos":
      orderBy = { data: "asc" as Prisma.SortOrder };
      break;
    case "Maior preco":
      orderBy = { total: "desc" as Prisma.SortOrder };
      break;
    case "Menor preco":
      orderBy = { total: "asc" as Prisma.SortOrder };
      break;
    case "Ordem Alfabetica":
      orderBy = { client: { nomeCliente: "asc" as Prisma.SortOrder } };
      break;
    case "Pendentes":
    case "Pagos":
    default:
      orderBy = undefined;
      break;
  }

  return { where, orderBy };
}
