import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyMap, Entry } from 'src/app/core/models/stocks.model';

@Pipe({
  name: 'calcTickerWorth',
})
export class CalcTickerWorthPipe implements PipeTransform {
  transform(position: Entry, ...args: unknown[]): unknown {
    return `${position.price * position.quantity - (position?.fees || 0)}${
      CurrencyMap[position.currency].symbol
    }`;
  }
}
