import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

// components
import { AppComponent } from './app.component';
import { ProductTableListComponent } from './components/productTableList/productTableList.component';
import { ProductPanelListComponent } from './components/productPanelList/productPanelList.component';
import { ProductComponent } from './components/product/product.component';

// services
import { AuthInterceptor } from './services/interceptors/authInterceptor';
import { ErrorInterceptor } from './services/interceptors/errorInterceptor';

// pipes
import { YesNoPipe } from './pipes/yesNo.pipe';

@NgModule({
  imports: [
    // other modules we depend on
    BrowserModule,
    HttpClientModule,
  ],
  declarations: [
    // components
    AppComponent,
    ProductTableListComponent,
    ProductPanelListComponent,
    ProductComponent,
    // pipes
    YesNoPipe,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true, // this is required!
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true, // this is required!
    },
  ],
  bootstrap: [AppComponent], // the root component
})
export class AppModule {}
