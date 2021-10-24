import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../../shared.module';
import { NavItemComponent } from './nav-item/nav-item.component';
import { SideNavComponent } from './side-nav.component';

@NgModule({
  declarations: [SideNavComponent, NavItemComponent],
  imports: [BrowserModule, SharedModule],
  bootstrap: [SideNavComponent],
  exports: [SideNavComponent],
})
export class SideNavModule {}
