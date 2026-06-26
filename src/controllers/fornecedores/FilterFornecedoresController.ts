import { FastifyRequest, FastifyReply } from 'fastify'
import { FilterFornecedorRepositorie } from '../../repositories/FilterFornecedoresRepositorie'


export async function FilterFornecedoresController(request:FastifyRequest, reply: FastifyReply) {
    try {
        const response = await FilterFornecedorRepositorie(request.query)
        return response
    } catch (error){
        console.log(error)
        reply.statusCode = 500
        return { error: "Erro no servidor" }
    }
}