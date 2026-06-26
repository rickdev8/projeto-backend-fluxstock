import { FastifyRequest, FastifyReply } from 'fastify'
import DeleteVendaService from '../../services/DeleteVendaService'


export async function DeleteVendaController(request:FastifyRequest , reply: FastifyReply) {
    const id = request.params
    try {
        const response = await DeleteVendaService(id)
        return response
    } catch (error){
        console.log(error)
        reply.statusCode = 500
        return { error: "Erro no controller de vendas delete" }
    }
}
