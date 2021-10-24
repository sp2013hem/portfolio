import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SanitizeHtmlPipe } from './safe-html.pipe';

@NgModule({
  declarations: [SanitizeHtmlPipe],
  imports: [CommonModule],
  exports: [SanitizeHtmlPipe],
})
export class SharedPipesModule {}
