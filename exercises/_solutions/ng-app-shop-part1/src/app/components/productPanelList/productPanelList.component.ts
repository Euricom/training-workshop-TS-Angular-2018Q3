import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product.model';
import { ProductService } from '../../services/productService';

@Component({
  selector: 'product-panel-list',
  templateUrl: './productPanelList.component.html',
  styleUrls: ['./productPanelList.component.css'],
})
export class ProductPanelListComponent implements OnInit {
  products: Product[] = [];
  errorMessage = '';

  constructor(private productService: ProductService) {}

  public ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(page = 0, sortExpression = '') {
    this.productService.getProducts(0, sortExpression).subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        this.errorMessage = error.message;
      },
    );
  }
}
