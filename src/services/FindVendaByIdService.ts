import FindVendaByIdRepositorie from "../repositories/FindVendaByIdRepositorie";

export default async function FindVendaByIdService(id: any): Promise<any[]> {
  try {
     const response = await FindVendaByIdRepositorie(id);
     return response
  } catch (error) {
    console.error("Erro no serviço do Venda:", (error as Error).message);
    throw error;
  }
}
