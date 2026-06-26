import EditFornecedorRepositorie from "../repositories/EditFornecedorRepositorie";

export default async function FornecedorEditService(
  id: string,
  fornecedor: any
): Promise<void> {
  try {
    await EditFornecedorRepositorie(id, fornecedor);
  } catch (error) {
    console.error(
      "Erro no serviço do fornecedor Edit:",
      (error as Error).message
    );
    throw error;
  }
}
