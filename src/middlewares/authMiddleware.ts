import { FastifyReply, FastifyRequest } from "fastify";
import { decodeJWTToken } from "../utils/jwt";

export default async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<any> {
  try {
    const token = request.cookies.token;

    if (!token) {
      return reply.status(401).send({ error: "Token não fornecido" });
    }

    const decoded = decodeJWTToken(token); 

    (request as any).user = decoded;

    return decoded

  } catch (err) {
    return reply.status(401).send({ error: "Token inválido ou expirado" });
  }
}
