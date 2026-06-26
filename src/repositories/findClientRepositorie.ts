import { prisma } from "../libs/prismaInstance";

export default async function FindClientRepositorie(
  params: any,
  query: any
): Promise<any> {
  try {
    const limit: number = Number(params.limit) || 7;
    const busca: string | undefined = params.filtro;
    const page: number = Number(params.page) || 1;

    const rawFiltro = (query?.search ?? "").toString().trim().toLowerCase();

    let filtroStatus: "pagos" | "pendentes" | undefined = undefined;
    if (["pagos", "pago"].includes(rawFiltro)) filtroStatus = "pagos";
    if (["pendentes", "pendente"].includes(rawFiltro))
      filtroStatus = "pendentes";

    const whereBase: any = { deletedAt: false };
    if (busca && busca.trim() !== "") {
      whereBase.nomeCliente = {
        startsWith: busca,
        mode: "insensitive",
      };
    }

    let where = { ...whereBase };

    if (filtroStatus === "pendentes") {
      where = {
        ...whereBase,
        sales: {
          some: {
            statusPagamento: { contains: "pendente", mode: "insensitive" },
          },
        },
      };
    } else if (filtroStatus === "pagos") {
      where = {
        ...whereBase,
        AND: [
          {
            sales: {
              some: {
                statusPagamento: { contains: "pago", mode: "insensitive" },
              },
            },
          },
          {
            NOT: {
              sales: {
                some: {
                  statusPagamento: {
                    contains: "pendente",
                    mode: "insensitive",
                  },
                },
              },
            },
          },
        ],
      };
    }

    const total = await prisma.client.count({ where });

    const clientes = await prisma.client.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        sales: {
          select: { statusPagamento: true },
        },
      },
    });

    const clientesComStatus = clientes.map((c: any) => ({
      id: c.id,
      nomeCliente: c.nomeCliente,
      enderecoCliente: c.enderecoCliente,
      cepCliente: c.cepCliente,
      telefoneCliente: c.telefoneCliente,
      status:
        c.sales.length > 0
          ? c.sales.some((s: any) =>
              s.statusPagamento.toLowerCase().includes("pendente")
            )
            ? "Pendente"
            : "Pago"
          : "Sem vendas",
    }));

    return {
      clientes: clientesComStatus,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (erro){
    console.log(erro)
  }
}