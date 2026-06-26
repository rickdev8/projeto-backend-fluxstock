import {FastifyRequest, FastifyReply} from 'fastify'
import FindFornecedoresByIdService from '../../services/FindFornecedoresByIdService';

export async function FindFornecedoresByIdController(request:FastifyRequest, reply: FastifyReply) {
  try {
    const id = request.params as string
    const fornecedor = await FindFornecedoresByIdService(id);
    reply.statusCode = 201
    return fornecedor
  } catch (error) {
    reply.statusCode = 500
    console.error(error);
    return { error: "Erro no servidor do fornecedor" }
  }
}
