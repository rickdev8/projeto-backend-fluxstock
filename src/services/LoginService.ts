import { loginDTO } from "../interfaces/loginDTO";
import { HashCompare } from "../utils/comparePassword";
import FindUSer from "../repositories/findUser";
import ValidatorLoginDto from "../validators/validatorLoginDTO";
import { createJWTToken } from "../utils/jwt";

export default async function LoginService(data: loginDTO): Promise<any> {
  const userDTO = ValidatorLoginDto(data);

  const user = await FindUSer(userDTO);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  try {
    const isValid = await HashCompare(userDTO.password, user.password);

    if (!isValid) {
      throw new Error("Senha inválida");
    }

    const sla = createJWTToken(user);
    return sla
  } catch (error) {
    console.error(error);
    throw error;
  }
}
