import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StocksAPI } from './core/services/stocks.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [StocksAPI],
  bootstrap: [AppComponent],
})
export class AppModule {}
