import GetFornecedor from "../repositories/GetFornecedorRepositorie";

export default async function GetFornecedorService(
  params: any,
  query: any
): Promise<void> {
  try {
    const response = await GetFornecedor(params, query);
    return response;
  } catch (error) {
    console.error("Erro no serviço do Fornecedor:", (error as Error).message);
    throw error;
  }
}
