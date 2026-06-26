import {FastifyRequest, FastifyReply} from 'fastify'
import AddProductService from '../../services/AddProductService';
import { Sale } from '../../interfaces/Venda';
import AddNewVendaService from '../../services/AddNewVenda';

export async function CreateVendaController(request:FastifyRequest <{Body: Sale}>, reply: FastifyReply) {
  try {
    const data = request.body 
    await AddNewVendaService(data)
    reply.statusCode = 201

    return { message: "Produto vendido!" }
  } catch (error) {
    reply.statusCode = 500
    console.error(error);
    return { error: "Erro no servidor" }
  }
}
