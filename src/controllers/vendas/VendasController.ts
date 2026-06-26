import {FastifyRequest, FastifyReply} from 'fastify'
import { Sale } from '../../interfaces/Venda';
import FindVendaService from '../../services/FindVendaService';

export async function FindVendasController(request:FastifyRequest <{Body: Sale}>, reply: FastifyReply) {

  const params = request.params as any
  try {
    const vendas = await FindVendaService(params.page, params.limit)
    reply.statusCode = 201

    return vendas
  } catch (error) {
    reply.statusCode = 500
    console.error(error);
    return { error: "Erro no servidor" }
  }
}
