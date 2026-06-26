import { FastifyInstance } from "fastify";
import { loginControler, registerController } from "../controllers/user";
import authMiddleware from "../middlewares/authMiddleware";
import { CreateProductController } from "../controllers/products/CreateProductController";
import { FindProductController } from "../controllers/products/FindProductController";
import { CreateClienteController } from "../controllers/clients/CreateClienteController";
import { FindClienteController } from "../controllers/clients/FindClienteController";
import { DeleteProductController } from "../controllers/products/DeleteProductController";
import { CreateFornecedorController } from "../controllers/fornecedores/CreateFornecedor.module";
import { GetFornecedorController } from "../controllers/fornecedores/GetFornecedorController";
import { CreateVendaController } from "../controllers/vendas/CreateVendaController";
import { ObterDadosCards } from "../controllers/dados/CardsInfo";
import { EditProductControllerId } from "../controllers/products/EditProductId";
import { EditProductController } from "../controllers/products/EditProductController";
import { FindVendasController } from "../controllers/vendas/VendasController";
import { FindClientByIdController } from "../controllers/clients/FindClientByIdController";
import { EditClienteController } from "../controllers/clients/EditClientController";
import { DeleteClienttController } from "../controllers/clients/DeleteClientController";
import { EditFornecedorController } from "../controllers/fornecedores/editFornecedorController";
import { FindFornecedoresByIdController } from "../controllers/fornecedores/findFornecedores";
import { DeleteFornecedorController } from "../controllers/fornecedores/deleteFornecedorController";
import { FindVEndaByIdController } from "../controllers/vendas/FindVendas";
import { EditVendasController } from "../controllers/vendas/editVendasController";
import { DeleteVendaController } from "../controllers/vendas/DeleteVendasController";
import { FilteredVendasController } from "../controllers/vendas/FilteredVendasController";
import { FilterFornecedoresController } from "../controllers/fornecedores/FilterFornecedoresController";
import { GetTodosClientes } from "../repositories/GetTodosClientes";
import { GetRelatorioVendas } from "../controllers/vendas/GetRelatorioVendas";

export default function MainRoutes(app: FastifyInstance) {
  app.post("/register", registerController);
  app.post("/login", loginControler);
  app.post("/login/auth", {
    preHandler: authMiddleware,
    handler: async (request, reply) => {
      reply.send("Autenticado");
    },
  });
  app.post("/homepage/addProduct", CreateProductController);
  app.get("/homepage/allProducts/:page/:limit", FindProductController);
  app.post("/homepage/AddClient", CreateClienteController);
  app.get("/homepage/findClient/:page/:limit/:filtro", FindClienteController);
  app.delete("/homepage/deleteProduct/:id", DeleteProductController);
  app.post("/homepage/addFornecedor", CreateFornecedorController);
  app.get("/homepage/GetFornecedor/:page/:limit", GetFornecedorController);
  app.post("/homepage/AddNewVenda", CreateVendaController);
  app.get("/homepage/DadosCard", ObterDadosCards);
  app.get("/homepage/editProoductId/:id", EditProductControllerId);
  app.put("/homepage/editProoduct/:id", EditProductController);
  app.get("/homepage/findVendas/:page/:limit", FindVendasController);
  app.get("/homepage/findClientById/:id", FindClientByIdController);
  app.put("/homepage/editClient/:id", EditClienteController);
  app.delete("/homepage/deleteClient/:id", DeleteClienttController);
  app.put("/homepage/editFornecedor/:id", EditFornecedorController);
  app.get("/homepage/findFornecedorById/:id", FindFornecedoresByIdController);
  app.delete("/homepage/deleteFornecedor/:id", DeleteFornecedorController);
  app.get("/homepage/findVendasById/:id", FindVEndaByIdController);
  app.put("/homepage/EditVendas/:id", EditVendasController);
  app.delete("/homepage/DeleteVenda/:id", DeleteVendaController);
  app.get(
    "/homepage/filterVendas/:value/:page/:limit",
    FilteredVendasController
  );
  app.get("/homepage/filterFornecedor", FilterFornecedoresController);
  app.get("/homepage/todosClientes", GetTodosClientes);
  app.get("/homepage/findRelatorioVendas/:page/:limit", GetRelatorioVendas);
}
