import {FastifyRequest, FastifyReply} from 'fastify'
import DeleteProductService from '../../services/DeleteProductService'

export async function DeleteProductController(request:FastifyRequest , reply: FastifyReply) {
    const id = request.params

    try {
        const response = await DeleteProductService(id)
        return response
    } catch (error){
        reply.statusCode = 500
        return { error: "Erro no servidor" }
    }
}
