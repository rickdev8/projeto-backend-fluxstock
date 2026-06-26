import { FastifyRequest, FastifyReply } from "fastify";
import EditVendaService from "../../services/EditVendaService";

export async function EditVendasController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const idvenda = request.params;
  const datavenda = request.body;
  try {
    const response = await EditVendaService(idvenda, datavenda);
    return response;
  } catch (error) {
    reply.statusCode = 500;
    return { error: "Erro no servidor de vendas edit" };
  }
}
