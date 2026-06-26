import DadosCardRepositorieLine from "../repositories/DadosCardRepositorieLine";

export default async function ObterDadosCardsServiceLine(dataInicio: string, dataFim: string): Promise<void> {
  try {
     const response = await DadosCardRepositorieLine(dataInicio, dataFim);
     return response
  } catch (error) {
    console.error("Erro no serviço do Dados Line:", (error as Error).message);
    throw error;
  }
}
