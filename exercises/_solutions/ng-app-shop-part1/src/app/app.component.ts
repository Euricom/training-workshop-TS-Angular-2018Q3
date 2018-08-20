// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app works!';
  showTable = true;

  constructor() {}

  onToggle() {
    console.log(this.showTable);
    this.showTable = !this.showTable;
  }
}
