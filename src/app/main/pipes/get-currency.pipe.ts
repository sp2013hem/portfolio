import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyMap, Entry } from 'src/app/core/models/stocks.model';

@Pipe({
  name: 'getCurrency',
})
export class GetCurrencyPipe implements PipeTransform {
  transform(value: string, currency: keyof typeof CurrencyMap): string {
    return `${value}${CurrencyMap[currency].symbol}`;
  }
}
