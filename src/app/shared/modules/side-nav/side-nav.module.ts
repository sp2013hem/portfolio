import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { NavItemComponent } from './nav-item/nav-item.component';
import { SideNavComponent } from './side-nav.component';

@NgModule({
  declarations: [SideNavComponent, NavItemComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  bootstrap: [SideNavComponent],
  exports: [SideNavComponent],
})
export class SideNavModule {}
