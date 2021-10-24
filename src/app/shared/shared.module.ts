import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IconComponent } from './components/icon/icon.component';
import { SharedPipesModule } from './modules/pipes/pipes.module';

@NgModule({
  declarations: [IconComponent],
  imports: [BrowserModule, SharedPipesModule],
  exports: [IconComponent],
})
export class SharedModule {}
