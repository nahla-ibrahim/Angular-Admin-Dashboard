import { ProductType } from './products-types';

export interface OrdersType {
  carts: OrderType[];
  total: number;
  skip: number;
  limit?: number;
}

export interface OrderType {
  id?: number;
  userId: number;
  products: ProductType[];
  total: number;
  totalProducts: number;
  totalQuantity: number;
}
