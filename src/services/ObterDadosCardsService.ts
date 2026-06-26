import DadosCardRepositorie from "../repositories/DadosCardRepositorie";

export default async function ObterDadosCardsService(): Promise<void> {
  try {
     const response = await DadosCardRepositorie();
     return response
  } catch (error) {
    console.error("Erro no serviço do Cliente:", (error as Error).message);
    throw error;
  }
}
