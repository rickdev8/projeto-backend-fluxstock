import { Sale } from "../interfaces/Venda";
import CreateNewSalesProduct from "../repositories/CreateNewSalesProduct";
import CreateNewVenda from "../repositories/CreateVendaRepositorie";
import FindProductById from "../repositories/FindProductById";
import EditProductQuantityRepositorie from "../repositories/EditProductQuantityRepositorie";

export default async function AddNewVendaService(sale: Sale): Promise<void> {

  try {
    const products = await FindProductById(
      sale.products.map((e) => e.idProduto)
    );

    let total = 0;

    for (const i of products) {
      total +=
        i.precoVenda *
        sale.products.find((e) => e.idProduto == i.id)?.quantidade!;
    }

    total = total - (total * sale.desconto || 0) / 100;

    const response = await CreateNewVenda(
      sale.paymentMethod,
      total,
      sale.clientId,
      sale.statusPagamento
    );

    for (const i of products) {
      const quantity = sale.products.find((e) => e.idProduto == i.id)
        ?.quantidade!;
      await CreateNewSalesProduct(
        i.id!,
        i.precoVenda * quantity,
        quantity,
        response.id
      );
      await EditProductQuantityRepositorie(i.id, i.quantidade - quantity);
    }
  } catch (error) {
    console.error("Erro no serviço do Cliente:", (error as Error).message);
    throw error;
  }
}
