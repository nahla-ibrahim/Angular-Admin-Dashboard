export interface ProductsType {
  products: ProductType[];
  total: number;
  skip: number;
  limit?: number;
}

export interface ProductType {
  id?: number;
  title: string;
  price: string;
  category: string;
  rating: string;
  stock: string;
  brand: string;
}
