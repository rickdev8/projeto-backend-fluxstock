import {FastifyRequest, FastifyReply} from 'fastify'
import GetFornecedorService from '../../services/GetFornecedorService';


export async function GetFornecedorController(request:FastifyRequest, reply: FastifyReply) {
  const params = request.params
  const query = request.query
  try {
   const fornecedores = await GetFornecedorService(params, query);
    reply.statusCode = 201
    return fornecedores
  } catch (error) {
    reply.statusCode = 500
    console.error(error);
    return { error: "Erro no servidor" }
  }
}
