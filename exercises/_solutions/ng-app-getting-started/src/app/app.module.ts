import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// components
import { AppComponent } from './app.component';
import { AlertComponent } from './components/alert/alert.component';

// filters
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  imports: [
    // other modules we depend on
    BrowserModule,
    FormsModule,
  ],
  declarations: [
    // all declared components, directives, pipes, ...
    AppComponent,
    AlertComponent,
    FilterPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
