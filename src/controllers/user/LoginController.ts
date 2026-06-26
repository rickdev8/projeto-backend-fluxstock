import { FastifyRequest, FastifyReply } from "fastify";
import LoginService from "../../services/LoginService";
import { loginDTO } from "../../interfaces/loginDTO";

const loginControler = async (
  request: FastifyRequest<{ Body: loginDTO }>,
  reply: FastifyReply
) => {
  const token = await LoginService(request.body);
  reply
    .setCookie("token", token.token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 3600,
      sameSite: "lax",
    })
    .send({ token });
};

export { loginControler };
