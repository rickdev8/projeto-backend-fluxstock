import {FastifyRequest, FastifyReply} from 'fastify'
import DeleteClientService from '../../services/DeleteClientService'

export async function DeleteClienttController(request:FastifyRequest , reply: FastifyReply) {
    const id = request.params as string

    try {
        const response = await DeleteClientService(id)
        return response
    } catch (error){
        console.log(error)
        reply.statusCode = 500
        return { error: "Erro no servidor do delete client" }
    }
}
