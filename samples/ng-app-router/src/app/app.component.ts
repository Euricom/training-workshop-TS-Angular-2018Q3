import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>
      {{title}}
    </h1>
    <!--
    <button (click)="toggle= !toggle">toggle</button>
    <div [myShow]="toggle">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Beatae maxime esse nisi. Vitae laboriosam obcaecati,
      corrupti laudantium accusantium nesciunt doloremque nam at corporis beatae quidem assumenda.
      Eligendi sapiente ad repellendus!
    </div>
    -->
    <nav>
        <a routerLink="/foo" routerLinkActive="active-link">Foo</a> -
        <a routerLink="/bar" routerLinkActive="active-link">Bar</a> -
        <a routerLink="/admin" routerLinkActive="active-link">Admin</a>
    </nav>
    <hr/>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'app work';
  toggle = true;
}
