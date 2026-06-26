import { SupplierDTO } from "../interfaces/SupplierDTO";
import DeleteFornecedorRepositorie from "../repositories/DeleteFornecedorRepositorie";

export default async function DeleteFornecedorService(
  id: string
): Promise<SupplierDTO> {
  try {
    const response = await DeleteFornecedorRepositorie(id);
    return response;
  } catch (error) {
    console.error("Erro no serviço do Fornecedor:", (error as Error).message);
    throw error;
  }
}