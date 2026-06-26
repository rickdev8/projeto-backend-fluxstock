import { prisma } from "../libs/prismaInstance";

export default async function DadosCardRepositorie(): Promise<any> {
  try {
    const totalProdutos = await prisma.sales.aggregate({
      _sum: {
        total: true,
      },
    });

    const result =
      await prisma.$queryRaw`select sum(sp.total - (p.preco * sp.quantity)) from "Sales" s
   inner join "SalesProduct" sp ON sp."salesId" = s.id 
   inner join "Product" p ON p.id = sp."productId"
  `;

    const produtoMaisVendido: any = await prisma.$queryRaw`
select sum(sp.quantity) as qtd, p."nomeProduto" from "Sales" s
   inner join "SalesProduct" sp ON sp."salesId" = s.id 
   inner join "Product" p ON p.id = sp."productId"
   group by p."nomeProduto" order by qtd desc limit 1
  `;

    const produtosMaisVendidos: [] = await prisma.$queryRaw`
select sum(sp.quantity)::int as qtd, p."nomeProduto" from "Sales" s
   inner join "SalesProduct" sp ON sp."salesId" = s.id 
   inner join "Product" p ON p.id = sp."productId"
   group by p."nomeProduto" order by qtd desc limit 4
  `;

    const ClientesCaount = await prisma.client.count();

    const ArrCategoria =
      await prisma.$queryRawUnsafe(`select "categoria", count("categoria")::int as total from "Product"
group by "categoria"`);

    const MediaDiariaVendas: any =
      await prisma.$queryRawUnsafe(`SELECT AVG("total") AS media_total
FROM "Sales";
`);

    const produtoss = await prisma.product.findMany({
      orderBy: {
        quantidade: "asc",
      },
      take: 6,
    });

    const UIltimos4Dias: string = await prisma.$queryRawUnsafe(`SELECT 
   s."data"::date AS dia,
   SUM(sp.total) AS receita_do_dia,
   SUM(p.preco * sp.quantity)::int AS despesas_do_dia,
   SUM(sp.total - (p.preco * sp.quantity)) AS lucro_do_dia
FROM "Sales" s
INNER JOIN "SalesProduct" sp ON sp."salesId" = s.id 
INNER JOIN "Product" p ON p.id = sp."productId"
WHERE s."data"::date IN (
   SELECT DISTINCT s2."data"::date
   FROM "Sales" s2
   ORDER BY s2."data"::date DESC
   LIMIT 4
)
GROUP BY s."data"::date
ORDER BY dia DESC;
`);

    const totalVendas: number = await prisma.sales.count();

    const dados = {
      totalProdutos: totalProdutos._sum.total,
      totalClientes: ClientesCaount,
      lucro: result,
      totalVendas,
      maisVendido: produtoMaisVendido[0].nomeProduto,
      quantidadeMaisVendido: Number(produtoMaisVendido[0].qtd),
      ArrCategoria: ArrCategoria,
      baixoEstoque: produtoss,
      produtosMaisVendidos: produtosMaisVendidos,
      mediaDiaria: MediaDiariaVendas[0].media_total,
      graficoDias: UIltimos4Dias,
    };

    return dados;
  } catch (erro) {
    throw new Error("Erro no repositorie de DadosCard");
  } 
}
