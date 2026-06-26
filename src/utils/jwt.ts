import jwt from 'jsonwebtoken'
import { UserDTO } from '../interfaces/userDTO';
import dotenv from 'dotenv'
import { emit } from 'process';

dotenv.config()

const createJWTToken = (userDTO: UserDTO): any => {
    const privatekey: string | undefined = process.env.PRIVATE_KEY

    if (!privatekey) {
        throw new Error('chave inválida ou não encontrada')
    }

    const token = jwt.sign(
        { id: userDTO.id },
        privatekey,
        { algorithm: 'HS256', expiresIn: '1h' },
    )

    let dados = {
        name: userDTO.name,
        email: userDTO.email,
        token
    }

    return dados
}

const decodeJWTToken = (token: string): jwt.JwtPayload | string => {
    const privatekey: string | undefined = process.env.PRIVATE_KEY

    if (!privatekey) {
        throw new Error('chave inválida ou não encontrada')
    }

    return jwt.verify(
        token,
        privatekey,
    )
}

export { createJWTToken, decodeJWTToken }