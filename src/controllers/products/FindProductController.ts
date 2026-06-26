import { FastifyRequest, FastifyReply } from "fastify";
import FindProduct, { ParamsProps } from "../../repositories/findProduct";

export async function FindProductController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const params = request.params;
  try {
    const response = await FindProduct(params as ParamsProps, request.query);
    return response;
  } catch (error) {
    console.log(error);
    reply.statusCode = 500;
    return { error: "Erro no servidor" };
  }
}
