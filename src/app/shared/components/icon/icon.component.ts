import { Component, Input } from '@angular/core';
import { Icons, IconsKeys } from 'src/app/core/models/common.models';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
})
export class IconComponent {
  icons = Icons;
  @Input() path?: IconsKeys;
}
