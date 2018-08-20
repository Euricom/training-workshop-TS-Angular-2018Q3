import { ProductService } from '../../services/productService';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'product-table-list',
  templateUrl: './productTableList.component.html',
  styleUrls: ['./productTableList.component.css'],
})
export class ProductTableListComponent implements OnInit {
  errorMessage!: string;
  sortBy!: string;
  sortAsc = false;
  products: Product[] = [];
  latestPage = 0;

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

  onSort(fieldName: string) {
    if (fieldName === this.sortBy) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortAsc = true;
      this.sortBy = fieldName;
    }
    const sortExpression = `${this.sortAsc ? '' : '-'}${fieldName}`;
    this.getProducts(0, sortExpression);
  }

  selectedClass(fieldName: string) {
    return fieldName === this.sortBy ? 'sort-' + this.sortAsc : false;
  }
}
