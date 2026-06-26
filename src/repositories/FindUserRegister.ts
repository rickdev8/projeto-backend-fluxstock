import { prisma } from "../libs/prismaInstance";

export default async function FindUserRegister(email: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return !!user;
  } catch (error) {
    console.error("Erro no FindUserRegister:", (error as Error).message);
    throw error;
  }
}