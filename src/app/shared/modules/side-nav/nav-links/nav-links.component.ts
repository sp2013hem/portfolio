import { Component } from '@angular/core';
import { IconsKeys } from 'src/app/core/models/common.models';

interface Link {
  title: string;
  icon: IconsKeys;
  url?: string;
}

@Component({
  selector: 'app-nav-links',
  templateUrl: './nav-links.component.html',
})
export class NavLinkComponent {
  links: Link[];
  constructor() {
    this.links = [
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
  }
}
