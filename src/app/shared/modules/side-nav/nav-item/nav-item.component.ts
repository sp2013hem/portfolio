import { Component, Input } from '@angular/core';
import { NavLink } from 'src/app/core/models/common.models';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
})
export class NavItemComponent {
  @Input() item?: NavLink;
}
