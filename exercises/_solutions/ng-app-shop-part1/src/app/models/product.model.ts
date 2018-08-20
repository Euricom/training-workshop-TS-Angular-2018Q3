import { IProductDTO } from '../services/productService';

export class Product {
  id!: number;
  sku!: string;
  title!: string;
  desc!: string;
  image!: string;
  stocked!: boolean;
  basePrice!: number;
  price!: number;

  constructor(data: IProductDTO) {
    // copy over all properties
    Object.assign(this, data);
  }
}
