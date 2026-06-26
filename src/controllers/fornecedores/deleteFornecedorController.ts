import {FastifyRequest, FastifyReply} from 'fastify'
import DeleteFornecedorService from '../../services/DeleteFornecedorService'

export async function DeleteFornecedorController(request:FastifyRequest , reply: FastifyReply) {
    const id = request.params as string

    try {
        const response = await DeleteFornecedorService(id)
        return response
    } catch (error){
        console.log(error)
        reply.statusCode = 500
        return { error: "Erro no servidor do fornecedor" }
    }
}
