import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-greet',
  templateUrl: './greet.component.html',
  styleUrls: ['./greet.component.scss'],
})
export class GreetComponent implements OnInit {
  @Input() name: string | undefined = '';
  greet: string = '';
  constructor() {}

  ngOnInit(): void {
    const myDate = new Date();
    const hrs = myDate.getHours();

    if (hrs < 12) {
      this.greet = 'Good Morning';
    } else if (hrs >= 12 && hrs <= 17) {
      this.greet = 'Good Afternoon';
    } else if (hrs >= 17 && hrs <= 24) {
      this.greet = 'Good Evening';
    }
  }
}
