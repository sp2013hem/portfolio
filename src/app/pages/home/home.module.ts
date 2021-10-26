import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { StatsComponent } from './components/stats/stats.component';
import { TableComponent } from './components/table/table.component';
import { StocksAPI } from '../../core/services/stocks.service';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, StatsComponent, TableComponent],
  imports: [SharedModule, HomeRoutingModule],
  providers: [StocksAPI],
})
export class HomeModule {}
