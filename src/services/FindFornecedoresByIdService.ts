import FindFornecedorByIdRepositorie from "../repositories/FindFornecedorByIdRepositorie";

export default async function FindFornecedoresByIdService(id: string): Promise<any> {
  try {
     const response = await FindFornecedorByIdRepositorie(id);
     return response
  } catch (error) {
    console.error("Erro no serviço do Fornecedor:", (error as Error).message);
    throw error;
  }
}
