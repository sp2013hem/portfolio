import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StocksAPI } from './core/services/stocks.service';
import { SideNavModule } from './shared/modules/side-nav/side-nav.module';
import { StatsModule } from './shared/modules/stats/stats.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SharedModule, SideNavModule, StatsModule],
  providers: [StocksAPI],
  bootstrap: [AppComponent],
})
export class AppModule {}
