import DeleteVendaRepositorie from "../repositories/DeleteVendaRepositorie";


export default async function DeleteVendaService(id: any): Promise<void> {
  try {
     const response = await DeleteVendaRepositorie(id.id);
     return response
  } catch (error) {
    console.error("Erro no serviço do delete Venda:", (error as Error).message);
    throw error;
  }
}
