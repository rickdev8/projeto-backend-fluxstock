import {FastifyRequest, FastifyReply} from 'fastify'
import RelatorioVendas from '../../repositories/RelatorioVendasRepositorie'

export async function GetRelatorioVendas(request:FastifyRequest, reply: FastifyReply) {
    const Value = request.params 
    try {
        const response = await RelatorioVendas(Value, request.query)
        return response
    } catch (error){
        console.log(error)
        reply.statusCode = 500
        return { error: "Erro no servidor" }
    }
}