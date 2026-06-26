export interface Sale {
  products: {
    idProduto: string;
    quantidade: number;
  }[];
  desconto: number;
  clientId: string;
  statusPagamento: string;
  paymentMethod: string;
  total: number;
  valorParcial: number;
}

export interface SaleResponse {
  id: string;
  data: Date;
  clientId: string;
  total: number;
  paymentMethod: string;
  statusPagamento: string;
  valorParcial: number | null;
}