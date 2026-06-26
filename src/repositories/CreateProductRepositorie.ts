import { prisma } from "../libs/prismaInstance";
import type { Product } from "../interfaces/Product";

export default async function PushProductDB(
  product: Product
): Promise<Product> {
  const productC = await prisma.product.create({
    data: {
      nomeProduto: product.nomeProduto,
      preco: product.preco,
      precoVenda: product.precoVenda,
      quantidade: product.quantidade,
      categoria: product.categoria,
      descricao: product.descricao,
      barCode: product.barCode,
    },
  });


  return productC;
}
