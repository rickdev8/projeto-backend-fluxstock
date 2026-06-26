import { FastifyReply, FastifyRequest } from "fastify";
import { Sale } from "../../interfaces/Venda";
import ObterDadosCardsService from "../../services/ObterDadosCardsService";
import ObterDadosCardsServiceLine from "../../services/ObterDadosCardsServiceLine";

export async function ObterDadosCards(
  request: FastifyRequest<{ Querystring: { dataInicio?: string; dataFim?: string } }>,
  reply: FastifyReply
) {
  const { dataInicio, dataFim } = request.query;

  try {
    const dados = await ObterDadosCardsService();
    const dadosLine = await ObterDadosCardsServiceLine(
      dataInicio ?? "1900-01-01", 
      dataFim ?? new Date().toISOString().slice(0, 10) 
    );

    reply.statusCode = 200;
    return { dados, dadosLine };
  } catch (error) {
    reply.statusCode = 500;
    console.error(error);
    return { error: "Erro no back parte de DadosCard" };
  }
}
