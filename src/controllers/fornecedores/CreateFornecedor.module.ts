import {FastifyRequest, FastifyReply} from 'fastify'
import FornecedorService from '../../services/AddFornecedorService';

export async function CreateFornecedorController(request:FastifyRequest, reply: FastifyReply) {
  try {
    const data = request.body as Record<string, any>
    await FornecedorService(data);
    reply.statusCode = 201
    return { message: "Fornecedor criado!" }
  } catch (error) {
    reply.statusCode = 500
    console.error(error);
    return { error: "Erro no servidor" }
  }
}
