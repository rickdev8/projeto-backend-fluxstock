import { ClientDTO } from "../interfaces/ClienteDTO";
import EditClientRepositorie from "../repositories/EditClientRepositorie";

export default async function ClientEditService(
  id: string,
  cliente: ClientDTO
): Promise<void> {
 

  const cleanData = {
    nomeCliente: cliente.nomeCliente?.value?.trim() || "",
    enderecoCliente: cliente.enderecoCliente?.value?.trim() || "",
    telefoneCliente: cliente.telefoneCliente?.value?.trim() || "",
    cepCliente: Number(cliente.cepCliente?.value) || 0,
  };

  try {
    await EditClientRepositorie(id, cleanData);
  } catch (error) {
    console.error("Erro no serviço do client Edit:", (error as Error).message);
    throw error;
  }
}
