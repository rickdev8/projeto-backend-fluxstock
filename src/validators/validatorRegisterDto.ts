import { registerDTO } from "../interfaces/registerDTO";
import { registerValidDTO } from "../interfaces/registerValidDTO";

export default function ValidatorRegisterDto(userDTO: registerDTO): registerDTO {
  const nameRegex = /^[a-zA-ZÀ-ÿ\s]{6,}$/;
  const passwordRegex = /^.{6,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

  if (!userDTO.name || !userDTO.email || !userDTO.password || !userDTO.confirmPassword) {
    throw new Error("Dados inválidos, por favor preencha todos os campos e tente novamente!");
  }

  if (!nameRegex.test(userDTO.name)) {
    throw new Error("O nome deve ter pelo menos 6 letras e conter apenas letras e espaços.");
  }

  if (!emailRegex.test(userDTO.email)) {
    throw new Error("E-mail inválido. Verifique e tente novamente.");
  }

  if (!passwordRegex.test(userDTO.password)) {
    throw new Error("A senha deve ter pelo menos 6 caracteres.");
  }

  if (userDTO.password !== userDTO.confirmPassword) {
    throw new Error("As senhas digitadas não são iguais.");
  }

  return userDTO;
}
