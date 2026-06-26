import { prisma } from "../libs/prismaInstance";
import { buildVendasQuery } from "../utils/FilterVendas";

export default async function RelatorioVendas(
  value: any,
  query: any
): Promise<any> {
  try {
    const page = Number(value.page) || 1;
    const limit = Number(value.limit) || 7;

    const statusValues = ["Pendente", "Pago"];
    let statusFilter: string[] = statusValues;
    if (value.value && statusValues.includes(value.value)) {
      statusFilter = [value.value];
    }

    const rawSearch =
      typeof query.search === "string" ? query.search.trim() : "";
    const hasSearch = rawSearch !== "";
    const searchQuery = hasSearch ? `%${rawSearch}%` : null;

    const { orderBy } = buildVendasQuery(value.value);
    let orderSQL = 'sa."data" DESC';
    if (orderBy) {
      if ("data" in orderBy) orderSQL = `sa."data" ${orderBy.data}`;
      if ("total" in orderBy) orderSQL = `sa."total" ${orderBy.total}`;
      if ("client" in orderBy && orderBy.client?.nomeCliente)
        orderSQL = `ve."nomeCliente" ${orderBy.client.nomeCliente}`;
    }

    const effectivePage = hasSearch ? 1 : Number(page) || 1;
    const offset = (effectivePage - 1) * limit;

    const total = await prisma.sales.count({
      where: {
        statusPagamento: { in: statusFilter },
        client: hasSearch
          ? {
              nomeCliente: {
                contains: rawSearch,
                mode: "insensitive",
              },
            }
          : undefined,
      },
    });

    const vendas = await prisma.sales.findMany({
      where: {
        statusPagamento: { in: statusFilter },
        client: hasSearch
          ? {
              nomeCliente: {
                contains: rawSearch,
                mode: "insensitive",
              },
            }
          : undefined,
      },
      include: {
        client: true,
        salesProduct: {
          include: {
            product: true,
          },
        },
      },
      orderBy:
        orderBy && "data" in orderBy
          ? { data: orderBy.data }
          : orderBy && "total" in orderBy
          ? { total: orderBy.total }
          : { data: "desc" },
      skip: offset,
      take: limit,
    });

    return {
      data: vendas,
      total,
      page: effectivePage,
      totalPages: Math.ceil(total / limit),
    };
  } catch (err) {
    console.log(err)
  }
}
