import { ClientDTO } from "../interfaces/ClienteDTO";
import PushClientDB from "../repositories/CreateClienteRepositorie";

export default async function ClientService(
  Client: ClientDTO
): Promise<void> {
  try {
     const response = await PushClientDB(Client);
     console.log(response)
  } catch (error) {
    console.error("Erro no serviço do Cliente:", (error as Error).message);
    throw error;
  }
}
