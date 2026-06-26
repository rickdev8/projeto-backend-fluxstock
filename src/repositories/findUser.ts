import { prisma } from "../libs/prismaInstance";
import { UserDTO } from "../interfaces/userDTO";
import { loginDTO } from "../interfaces/loginDTO";

export default async function FindUSer(userDTO: loginDTO): Promise<UserDTO> {

  const user = await prisma.user.findUnique({
    where: {
      email: userDTO.email,
    },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const userFound: UserDTO = {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
  };



  return userFound;
}
