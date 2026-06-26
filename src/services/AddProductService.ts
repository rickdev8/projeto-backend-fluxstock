import { Product } from "../interfaces/Product";
import PushProductDB from "../repositories/CreateProductRepositorie";
import FindProductQuantity from "../repositories/FindProductQuantity";
import UpQuantity from "../repositories/UpQuantityProduct";
import { v4 as uuidv4 } from "uuid";

export interface AddProductInput {
  nomeProduto: { value: string };
  categoria: { value: string };
  quantidade: { value: string };
  precoVenda: { value: string };
  precoCusto: { value: string };
  descricao: { value: string };
}

export default async function AddProductService(
  data: AddProductInput
): Promise<void> {
  function gerarBarCode() {
    const uuid = uuidv4();

    const numeros = uuid.replace(/\D/g, "");
    let barCode = numeros.slice(0, 13);

    while (barCode.length < 13) {
      barCode += Math.floor(Math.random() * 10).toString();
    }

    return barCode;
  }
  try {
    const productData: Product = {
      nomeProduto: data.nomeProduto.value.trim(),
      categoria: data.categoria.value.trim(),
      quantidade: Number(
        data.quantidade.value.replace(/[R$\s\.]/g, "").replace(",", ".")
      ),
      precoVenda: Number(
        data.precoVenda.value.replace(/[R$\s\.]/g, "").replace(",", ".")
      ),
      preco: Number(
        data.precoCusto.value.replace(/[R$\s\.]/g, "").replace(",", ".")
      ),
      descricao: data.descricao.value.trim(),
      barCode: gerarBarCode(),
    };

    const produtos: Product[] = await FindProductQuantity(productData);

    const ProdIguais = produtos.filter(
      (prod) =>
        prod.nomeProduto === productData.nomeProduto &&
        prod.categoria === productData.categoria
    );

    if (ProdIguais.length > 0) {
      await UpQuantity({
        ...ProdIguais[0],
        quantidade: ProdIguais[0].quantidade + productData.quantidade,
      });
    } else {
      await PushProductDB(productData);
    }
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
    throw error;
  }
}
