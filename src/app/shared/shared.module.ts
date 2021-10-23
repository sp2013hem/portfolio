import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IconComponent } from './components/icon/icon.component';

@NgModule({
  declarations: [IconComponent],
  imports: [BrowserModule],
  bootstrap: [IconComponent],
  exports: [IconComponent],
})
export class SharedModule {}
