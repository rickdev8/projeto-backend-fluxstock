import bcrypt from "bcrypt";

export default async function hashPassword(passwordDTO: string): Promise<string>{

const hashed = await bcrypt.hash(passwordDTO, 12)
    return hashed.toString();
}

