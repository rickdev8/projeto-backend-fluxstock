import DeleteClientRepositorie from "../repositories/DeleteClientRepositorie";


export default async function DeleteClientService(id: string): Promise<void> {
  try {
     const response = await DeleteClientRepositorie(id);
     return response
  } catch (error) {
    console.error("Erro no serviço do Cliente:", (error as Error).message);
    throw error;
  }
}
