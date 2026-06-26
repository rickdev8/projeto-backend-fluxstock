import { loginDTO } from "../interfaces/loginDTO";

export default function ValidatorLoginDto(userDTO: loginDTO): loginDTO {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{6,}$/;

  if (!userDTO.email || !userDTO.password) {
    throw new Error("Por favor, preencha todos os campos e tente novamente!");
  }

  if (!emailRegex.test(userDTO.email)) {
    throw new Error("E-mail inválido. Verifique e tente novamente.");
  }

  if (!passwordRegex.test(userDTO.password)) {
    throw new Error("A senha deve ter pelo menos 6 caracteres.");
  }

  return userDTO;
}
