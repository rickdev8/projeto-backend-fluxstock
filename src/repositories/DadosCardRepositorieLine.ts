import { prisma } from "../libs/prismaInstance";

export default async function DadosCardRepositorieLine(
  dataInicio?: string,
  dataFim?: string
): Promise<any> {
  try {
    let DadosLine;

    if (dataInicio && dataFim) {
      DadosLine = await prisma.$queryRaw<{ total: number; data: string }[]>`
        with mt as (
          select
            total,
            to_char(
              cast((cast(data as timestamp with time zone) at time zone '+03:00') as DATE),
              'YYYY-MM-DD'
            ) as data
          from "Sales"
          where data >= ${dataInicio}::timestamp
            and data < (${dataFim}::timestamp + interval '1 day')
        )
        select sum(total) as total, data
        from mt
        group by data
        order by data ASC;
      `;
    } else {
      DadosLine = await prisma.$queryRaw<{ total: number; data: string }[]>`
        with mt as (
          select
            total,
            to_char(
              cast((cast(data as timestamp with time zone) at time zone '+03:00') as DATE),
              'YYYY-MM-DD'
            ) as data
          from "Sales"
        )
        select sum(total) as total, data
        from mt
        group by data
        order by data ASC;
      `;
    }

    return DadosLine;
  } catch (erro) {
    console.error("Erro ao buscar dados do gráfico:", erro);
    throw erro;
  } 
}
