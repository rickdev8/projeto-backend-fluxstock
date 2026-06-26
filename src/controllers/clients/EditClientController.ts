import { FastifyRequest, FastifyReply } from "fastify";
import ClientEditService from "../../services/ClientEditService";
import { ClientDTO } from "../../interfaces/ClienteDTO";

export async function EditClienteController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const id = request.params as { id: string };
  const data = request.body as ClientDTO;

  try {
    await ClientEditService(id.id, data);

    return reply.status(200).send({
      message: "Cliente Editado!",
    });
  } catch (error) {
    return reply.status(500).send({
      error: "Erro no servidor do cliente edit",
    });
  }
}