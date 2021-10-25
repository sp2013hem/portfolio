import { Component, Input } from '@angular/core';
import { NavLink } from 'src/app/core/models/common.models';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
})
export class SideNavComponent {
  links: NavLink[] = [
    {
      title: 'Home',
      icon: 'home',
      url: '/',
    },
    {
      title: 'About',
      icon: 'info',
      url: '/info',
    },
    {
      title: 'Contact',
      icon: 'contact',
      url: '/contact',
    },
  ];
  settingsLink: NavLink = {
    title: 'Settings',
    icon: 'settings',
    url: '/settings',
  };
}
