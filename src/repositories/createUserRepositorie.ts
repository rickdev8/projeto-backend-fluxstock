import { prisma } from "../libs/prismaInstance";
import { UserDTO } from "../interfaces/userDTO";
import { registerValidDTO } from "../interfaces/registerValidDTO";

export default async function PushUserDB(
  registerUserDTO: registerValidDTO
): Promise<UserDTO> {
  const user = await prisma.user.create({
    data: {
      name: registerUserDTO.name,
      email: registerUserDTO.email,
      password: registerUserDTO.password,
    },
  });

  return user;
}
