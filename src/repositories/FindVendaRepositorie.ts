import { prisma } from "../libs/prismaInstance";

export default async function FindVendaRepositorie(
  page: number,
  limit: number
): Promise<any> {
  try {
    const offset = (page - 1) * limit;

    let vendas: any[] = await prisma.$queryRaw`
      SELECT 
        sa."id",
        sa."data",
        sa."total",
        sa."paymentMethod",
        sa."statusPagamento",
        ve."nomeCliente"
      FROM "Sales" sa
      INNER JOIN "Client" ve ON sa."clientId" = ve.id
      ORDER BY sa."data" DESC
      LIMIT ${BigInt(limit)}::int OFFSET ${BigInt(offset)}::int;
    `;

    const totalResult: any = await prisma.$queryRaw`
      SELECT COUNT(*) AS total FROM "Sales";
    `;
    const total = Number(totalResult[0].total);

    return { vendas, total };
  } catch (erro){
    console.log(erro)
  }
}
