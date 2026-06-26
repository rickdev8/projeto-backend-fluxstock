import DeleteProduct from "../repositories/deleteProductRepositorie";

export default async function DeleteProductService(id: any): Promise<void> {
  try {
     const response = await DeleteProduct(id.id);
     return response
  } catch (error) {
    console.error("Erro no serviço do Cliente:", (error as Error).message);
    throw error;
  }
}
