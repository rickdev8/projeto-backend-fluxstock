import { FastifyRequest, FastifyReply } from 'fastify';
import RegisterService from '../../services/RegisterService';
import { registerDTO } from '../../interfaces/registerDTO';

const registerController = async (
  request: FastifyRequest<{ Body: registerDTO }>,
  reply: FastifyReply
) => {
  try {
    const result = await RegisterService(request.body);

    if (result.statusCode !== 201) {
      return reply.status(result.statusCode).send({ message: result.message });
    }

    return reply.status(201).send(result.data);
  } catch (error) {
    console.error("Erro no registerController:", (error as Error).message);
    return reply.status(500).send({ message: "Erro interno do servidor" });
  }
};

export { registerController };
