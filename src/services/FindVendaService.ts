import FindVendaRepositorie from "../repositories/FindVendaRepositorie";

export default async function FindVendaService(page: number, limit: number): Promise<any> {
  try {
     const response = await FindVendaRepositorie(page, limit);
     return response
  } catch (error) {
    console.error("Erro no serviço do Venda:", (error as Error).message);
    throw error;
  }
}
