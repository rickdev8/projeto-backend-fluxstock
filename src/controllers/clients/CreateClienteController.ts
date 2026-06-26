import {FastifyRequest, FastifyReply} from 'fastify'
import ClientService from '../../services/AddClientService';
import { ClientDTO } from '../../interfaces/ClienteDTO';

export async function CreateClienteController(request:FastifyRequest, reply: FastifyReply) {
  try {
    const data = request.body as ClientDTO
    await ClientService(data);
    reply.statusCode = 201
    return { message: "Cliente criado!" }
  } catch (error) {
    reply.statusCode = 500
    console.error(error);
    return { error: "Erro no servidor" }
  }
}
