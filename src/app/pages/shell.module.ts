import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ShellRoutingModule } from './shell-routing.module';
import { ShellComponent } from './shell.component';
@NgModule({
  declarations: [ShellComponent],
  imports: [ShellRoutingModule, SharedModule],
  providers: [],
})
export class ShellModule {}
