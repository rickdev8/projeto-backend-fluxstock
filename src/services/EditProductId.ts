import EditProductRepositorieId from "../repositories/EditProductRepositorieId";

export default async function FindEditProductId(
  id: any
): Promise<void> {
  try {
     const response = await EditProductRepositorieId(id);
     return response
  } catch (error) {
    console.error("Erro no serviço do Product Edit:", (error as Error).message);
    throw error;
  }
}
