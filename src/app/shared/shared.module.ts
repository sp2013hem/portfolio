import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconComponent } from './components/icon/icon.component';
import { SharedPipesModule } from './modules/pipes/pipes.module';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { GreetComponent } from './components/greet/greet.component';

@NgModule({
  declarations: [
    IconComponent,
    HeaderComponent,
    LayoutComponent,
    NavItemComponent,
    SideNavComponent,
    GreetComponent,
  ],
  imports: [CommonModule, RouterModule, SharedPipesModule],
  exports: [IconComponent, GreetComponent, LayoutComponent],
})
export class SharedModule {}
