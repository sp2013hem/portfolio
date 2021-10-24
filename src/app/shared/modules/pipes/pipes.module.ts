import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SanitizeHtmlPipe } from './safe-html.pipe';

@NgModule({
  declarations: [SanitizeHtmlPipe],
  imports: [BrowserModule],
  exports: [SanitizeHtmlPipe],
})
export class SharedPipesModule {}
