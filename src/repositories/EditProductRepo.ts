import { Product } from "../interfaces/Product";
import { prisma } from "../libs/prismaInstance";


export default async function EditProductRepo(
  iD: any,
  data: Omit<Product, "id" | "createdAt" | "updatedAt">
): Promise<Product> {

  let produtoPreco = Number(data.preco.toString().replace(/,/g, "."));
  let produtoPrecoVenda = Number(data.precoVenda.toString().replace(/,/g, "."));

  const { nomeProduto, quantidade, categoria, descricao } = data;

  const product = await prisma.product.update({
    where: { id: iD.id },
    data: {
      nomeProduto,
      preco: produtoPreco,
      quantidade,
      precoVenda: produtoPrecoVenda,
      categoria,
      descricao,
    },
  });

  
  return product;
}
