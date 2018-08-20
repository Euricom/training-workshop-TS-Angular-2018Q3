import { Component, Input } from '@angular/core';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
})
export class ProductComponent {
  @Input() product: any;
}
