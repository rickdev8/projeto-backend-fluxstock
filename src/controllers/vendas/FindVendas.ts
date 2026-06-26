import {FastifyRequest, FastifyReply} from 'fastify'
import FindVendaByIdService from '../../services/FindVendaByIdService'


export async function FindVEndaByIdController(request:FastifyRequest, reply: FastifyReply) {
    const idVenda = request.params 
    try {
        const response = await FindVendaByIdService(idVenda)
        return response
    } catch (error){
        console.log(error)
        reply.statusCode = 500
        return { error: "Erro no servidor" }
    }
}
