import hashPassword from "../utils/hashPassword";
import PushUserDB from "../repositories/createUserRepositorie";
import { registerDTO } from "../interfaces/registerDTO";
import ValidatorRegisterDto from "../validators/validatorRegisterDto";
import FindUserRegister from "../repositories/FindUserRegister";

export default async function RegisterService(
  registerData: registerDTO
): Promise<{
  statusCode: number;
  data?: { id: string; name: string };
  message?: string;
}> {
  try {
    
    ValidatorRegisterDto(registerData);

    const userFinally = {
      name: registerData.name,
      email: registerData.email?.trim().toLowerCase(),
      password: await hashPassword(registerData.password),
    };

    const existingUser = await FindUserRegister(userFinally.email);

    if (existingUser) {
      return {
        statusCode: 409,
        message: "Email já cadastrado",
      };
    }

    const createdUser: any = await PushUserDB(userFinally);

    return {
      statusCode: 201,
      data: {
        id: createdUser.id,
        name: createdUser.name,
      },
    };
  } catch (error) {
    console.error("Erro no RegisterService:", (error as Error).message);

    if (
      error instanceof Error &&
      (
        error.message.includes("Dados inválidos") ||
        error.message.includes("nome") ||
        error.message.includes("E-mail") ||
        error.message.includes("senha")
      )
    ) {
      return {
        statusCode: 400,
        message: error.message,
      };
    }

    return {
      statusCode: 500,
      message: "Erro interno do servidor",
    };
  }
}
