import { prisma } from "../libs/prismaInstance";

export default async function EditFornecedorRepositorie(
  iD: any,
  data: any
): Promise<any> {
  const {
    nomeFornecedor,
    enderecoFornecedor,
    telefoneFornecedor,
    produtoFornecedor,
    cepFornecedor,
  } = data;
  const client = await prisma.suplier.update({
    where: { idFornecedor: iD.id },
    data: {
      nomeFornecedor,
      enderecoFornecedor,
      telefoneFornecedor,
      produtoFornecedor,
      cepFornecedor,
    },
  });


  return client;
}
