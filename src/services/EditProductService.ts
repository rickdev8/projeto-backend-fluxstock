import { Product } from "../interfaces/Product";
import EditProductRepo from "../repositories/EditProductRepo";

type ProductUpdateData = Omit<Product, "id" | "createdAt" | "updatedAt">;

export default async function EditProductService(
  produto: Product | any,
  id: string
): Promise<void> {
  try {
    const cleanData: ProductUpdateData = {
      nomeProduto: produto.nomeProduto?.value || "",
      preco: produto.precoCusto?.value || "0",
      precoVenda: produto.precoVenda?.value || "0",
      quantidade: Number(produto.quantidade?.value || "0"),
      categoria: produto.categoria?.value || "",
      descricao: produto.descricao?.value || "",
      barCode: produto.gerarBarCode || "",
    };

    await EditProductRepo(id, cleanData);
  } catch (error) {
    console.error("Erro no serviço do Product Edit:", (error as Error).message);
    throw error;
  }
}
