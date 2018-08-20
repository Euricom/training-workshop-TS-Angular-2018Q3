import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app works!';
  filterExpression!: string;
  users = [
    { id: 1, name: 'peter' },
    { id: 2, name: 'han' },
    { id: 3, name: 'pieter' },
    { id: 12, name: 'luc' },
    { id: 13, name: 'ben' },
  ];

  onAlertClosed() {
    console.log('alert closed');
  }

  onAdduser() {
    // adding an element on the array won't update the pure pipe
    // if you want this to work you have to have an unpure pipe
    this.users.push({ id: 14, name: 'peter' });

    // or create another array based on the first component
    // so change the this.users reference
    // this.users = [
    //   ...this.users,
    //   { id: 14, name: 'peter'}
    // ]
  }
}
