
import { SupplierReturnPromisse } from "../interfaces/SupplierDTO";
import { prisma } from "../libs/prismaInstance";

export interface SupplierDTOPush {
  id: string;
  nomeFornecedor: string;
  telefoneFornecedor: string;
  produtoFornecedor: string;
  enderecoFornecedor: string;
  cepFornecedor: string;
}

export default async function PushSuplierDB(
  suplier: SupplierDTOPush
): Promise<SupplierReturnPromisse> {


  const Fornecedor = await prisma.suplier.create({
    data: {
      idFornecedor: suplier.id,
      nomeFornecedor: suplier.nomeFornecedor,
      enderecoFornecedor: suplier.enderecoFornecedor,
      telefoneFornecedor: suplier.telefoneFornecedor,
      produtoFornecedor: suplier.produtoFornecedor,
      cepFornecedor: suplier.cepFornecedor,
    },
  });

 
  return Fornecedor;
}
