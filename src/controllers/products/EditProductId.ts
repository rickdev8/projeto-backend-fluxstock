import {FastifyRequest, FastifyReply} from 'fastify'
import EditProductService from '../../services/EditProductId'
import FindEditProductId from '../../services/EditProductId'

export async function EditProductControllerId(request:FastifyRequest, reply: FastifyReply) {
    const idProduto = request.params
    try {
        const response = await FindEditProductId(idProduto)
        return response
    } catch (error){
        console.log(error)
        reply.statusCode = 500
        return { error: "Erro no servidor" }
    }
}
