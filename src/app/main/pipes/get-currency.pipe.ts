import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyMap, Entry } from 'src/app/core/models/stocks.model';

@Pipe({
  name: 'getCurrency',
})
export class GetCurrencyPipe implements PipeTransform {
  transform(currency: keyof typeof CurrencyMap): string {
    return `${CurrencyMap[currency].symbol}`;
  }
}
