import { FastifyRequest, FastifyReply } from "fastify";
import AddProductService, { AddProductInput } from "../../services/AddProductService";

export async function CreateProductController(
  request: FastifyRequest,
  reply: FastifyReply
) {

  try {
    const data = request.body;
    await AddProductService(data as  AddProductInput);
    reply.statusCode = 201;
    return { message: "Produto criado!" };
  } catch (error) {
    reply.statusCode = 500;
    console.error(error);
    return { error: "Erro no servidor" };
  }
}
