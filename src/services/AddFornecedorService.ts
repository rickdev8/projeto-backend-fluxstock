import PushSuplierDB from "../repositories/CreateFornecedorRepositorie";

export default async function FornecedorService(
  Suplier: any
): Promise<void> {
  try {
      await PushSuplierDB(Suplier);
  } catch (error) {
    console.error("Erro no serviço do Cliente:", (error as Error).message);
    throw error;
  }
}
