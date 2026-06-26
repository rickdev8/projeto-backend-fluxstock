import fastify from "fastify";
import { FastifyReply, FastifyRequest } from "fastify";
import MainRoutes from "./routes/MainRoutes";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";

const app = fastify({
  logger: true,
});

app.register(cors, {
  origin: ["https://frontend-prod-bay.vercel.app", "http://localhost:4000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
});

app.register(fastifyMultipart, {
  attachFieldsToBody: true,
});

app.register(cookie);

app.register(MainRoutes);

app.get("/", (_request: FastifyRequest, reply: FastifyReply) => {
  reply.send("Servidor rodando");
});

app.listen({ port: 3000, host: "0.0.0.0" }, () => {
  console.log("Servidor Roawfdawfndo");
});
