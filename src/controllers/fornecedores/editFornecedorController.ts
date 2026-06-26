import { FastifyRequest, FastifyReply } from "fastify";
import FornecedorEditService from "../../services/FornecedorEditService";

export async function EditFornecedorController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const id: string | any = request.params;
  const data: any = request.body;
  try {
    await FornecedorEditService(id, data);
    reply.statusCode = 201;
    return { message: "Fornecedor Editado!" };
  } catch (error) {
    reply.statusCode = 500;
    console.error(error);
    return { error: "Erro no servidor do fornecedor edit" };
  }
}
