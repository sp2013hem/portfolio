import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../../shared.module';
import { NavLinkComponent } from './nav-links/nav-links.component';

import { SideNavComponent } from './side-nav.component';

@NgModule({
  declarations: [SideNavComponent, NavLinkComponent],
  imports: [BrowserModule, SharedModule],
  bootstrap: [SideNavComponent],
  exports: [SideNavComponent],
})
export class SideNavModule {}
