import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconComponent } from './components/icon/icon.component';
import { SharedPipesModule } from './modules/pipes/pipes.module';

@NgModule({
  declarations: [IconComponent],
  imports: [CommonModule, SharedPipesModule],
  exports: [IconComponent],
})
export class SharedModule {}
