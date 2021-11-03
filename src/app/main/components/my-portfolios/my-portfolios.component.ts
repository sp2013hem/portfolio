import { Component, Input, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/core/models/stocks.model';

@Component({
  selector: 'app-my-portfolios',
  templateUrl: './my-portfolios.component.html',
  styleUrls: ['./my-portfolios.component.scss'],
})
export class MyPortfoliosComponent implements OnInit {
  @Input() portfolios: Portfolio[];
  data = [
    { ticker: 'V', value: 235.4, position: 1, pl: 1.0079, totalPL: 1.0079 },
    { ticker: 'V', value: 235.4, position: 2, pl: -4.0026, totalPL: 4.0026 },
    { ticker: 'V', value: 235.4, position: 3, pl: 6.941, totalPL: 6.941 },
    { ticker: 'V', value: 235.4, position: 4, pl: -9.0122, totalPL: 9.0122 },
    { ticker: 'V', value: 235.4, position: 5, pl: 10.811, totalPL: 10.811 },
    { ticker: 'V', value: 235.4, position: 6, pl: 12.0107, totalPL: -12.0107 },
    { ticker: 'V', value: 235.4, position: 7, pl: 14.0067, totalPL: -14.0067 },
    { ticker: 'V', value: 235.4, position: 8, pl: 15.9994, totalPL: 15.9994 },
    { ticker: 'V', value: 235.4, position: 9, pl: 18.9984, totalPL: 18.9984 },
    { ticker: 'V', value: 235.4, position: 10, pl: 20.1797, totalPL: 20.1797 },
    { ticker: 'V', value: 235.4, position: 11, pl: -22.9897, totalPL: 22.9897 },
    { ticker: 'V', value: 235.4, position: 12, pl: 24.305, totalPL: 24.305 },
  ];
  constructor() {}

  ngOnInit(): void {}
}
