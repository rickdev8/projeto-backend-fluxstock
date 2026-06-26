import { FastifyRequest, FastifyReply } from "fastify";
import FilterVendaRepositorie from "../../repositories/FilteredVendasRepositorie";

export async function FilteredVendasController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const Value = request.params as any;
  const query = request.query as any;
  try {
    const response = await FilterVendaRepositorie(Value, query);
    return response;
  } catch (error) {
    console.log(error);
    reply.statusCode = 500;
    return { error: "Erro no servidor" };
  }
}
