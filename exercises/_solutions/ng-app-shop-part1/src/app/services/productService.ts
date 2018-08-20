import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

export interface IProductDTO {
  id: number;
  sku: string;
  title: string;
  desc: string;
  image: string;
  stocked: boolean;
  basePrice: number;
  price: number;
}

interface IProductsDTO {
  total: number;
  page: number;
  pageSize: number;
  selectedProducts: IProductDTO[];
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}
  getProducts(page = 0, sortExpression = ''): Observable<Product[]> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }
    if (sortExpression) {
      params = params.set('sort', sortExpression);
    }
    return this.httpClient
      .get<IProductsDTO>(`${environment.apiBase}/api/products`, { params })
      .pipe(
        map((data) =>
          data.selectedProducts.map((resource) => new Product(resource)),
        ),
      );
  }
}
