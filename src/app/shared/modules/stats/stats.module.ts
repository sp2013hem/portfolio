import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../../shared.module';
import { StatsComponent } from './stats.component';

@NgModule({
  declarations: [StatsComponent],
  imports: [BrowserModule, SharedModule],
  bootstrap: [StatsComponent],
  exports: [StatsComponent],
})
export class StatsModule {}
