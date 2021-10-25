import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      // grab everything we need
      const btn: any = document.querySelector('.mobile-menu-button');
      const sidebar: any = document.querySelector('.sidebar');

      // add our event listener for the click
      btn.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
      });
    }, 1000);
  }
}
