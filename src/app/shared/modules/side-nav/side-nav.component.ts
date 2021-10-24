import { Component, Input } from '@angular/core';
import { NavLink } from 'src/app/core/models/common.models';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styles: [
    `
      :host {
        @apply flex flex-col h-full py-6;
      }
    `,
  ],
})
export class SideNavComponent {
  links: NavLink[] = [
    {
      title: 'Home',
      icon: 'home',
    },
    {
      title: 'About',
      icon: 'info',
    },
    {
      title: 'Contact',
      icon: 'contact',
    },
  ];
  settingsLink: NavLink = {
    title: 'Settings',
    icon: 'settings',
  };
}
