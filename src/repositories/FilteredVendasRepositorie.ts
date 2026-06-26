import { prisma } from "../libs/prismaInstance";
import { buildVendasQuery } from "../utils/FilterVendas";

interface FilterParams {
  value?: string;
  page?: number;
  limit?: number;
}

interface QueryParams {
  search?: string;
}

export default async function FilterVendaRepositorie(
  value: FilterParams,
  query: QueryParams
) {
  const page = Number(value.page) || 1;
  const limit = Number(value.limit) || 7;
  const offset = (page - 1) * limit;
  const statusValues = ["Pendente", "Pago", "Parcial"];
  let statusFilter: string[] = statusValues;
  if (value.value && statusValues.includes(value.value)) {
    statusFilter = [value.value];
  }

  const search = query.search?.trim() || "";

  const { orderBy } = buildVendasQuery(value.value);
  let order: any = { data: "desc" };
  if (orderBy) {
    if (orderBy.data) order = { data: orderBy.data };
    if (orderBy.total) order = { total: orderBy.total };
    if (orderBy.client?.nomeCliente)
      order = { client: { nomeCliente: orderBy.client.nomeCliente } };
  }

  const [total, vendas] = await Promise.all([
    prisma.sales.count({
      where: {
        statusPagamento: { in: statusFilter },
        client: search
          ? { nomeCliente: { contains: search, mode: "insensitive" } }
          : undefined,
      },
    }),
    prisma.sales.findMany({
      where: {
        statusPagamento: { in: statusFilter },
        client: search
          ? { nomeCliente: { contains: search, mode: "insensitive" } }
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
      orderBy: order,
      skip: offset,
      take: limit,
    }),
  ]);

  const formattedVendas = vendas.map((venda: any) => ({
    id: venda.id,
    data: venda.data,
    total: Number(venda.total),
    paymentMethod: venda.paymentMethod,
    statusPagamento: venda.statusPagamento,
    nomeCliente: venda.client.nomeCliente,
    valorParcial: Number(venda.valorParcial),
    produtos: venda.salesProduct.map((sp: any) => ({
      id: sp.id,
      nomeProduto: sp.product?.nomeProduto || "Produto removido",
      categoria: sp.product?.categoria || "Produto Removido",
      precoVenda: sp.product.precoVenda || "0",
      precoCusto: sp.product.preco || "0",
      quantidade: sp.quantity,
      total: Number(sp.total),
    })),
  }));

  return {
    data: formattedVendas,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}
