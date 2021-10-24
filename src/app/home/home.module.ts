import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { StatsComponent } from './stats/stats.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [HomeComponent, StatsComponent, TableComponent],
  imports: [SharedModule, HomeRoutingModule],
})
export class HomeModule {}
