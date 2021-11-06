import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Portfolio, TickerData } from 'src/app/core/models/stocks.model';
import { PortfolioSelectors } from '../../store';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit, OnInit, OnDestroy {
  _$: Subscription;
  dataSource;
  displayedColumns: string[] = ['ticker', 'value', 'position', 'pl', 'totalPL'];
  @Input() portfolio: Portfolio;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private store: Store) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<TickerData>([]);
    this._$ = this.store
      .select(PortfolioSelectors.Portfolios)
      .pipe(
        map((portfolios) =>
          portfolios.find((e) => e.uid === this.portfolio.uid)
        )
      )
      .subscribe(
        (portfolio) =>
          (this.dataSource.data =
            portfolio.tickers ||
            [
              // {
              //   ticker: 'V',
              //   value: 235.4,
              //   position: 1,
              //   pl: 1.0079,
              //   totalPL: 1.0079,
              // },
            ])
      );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy() {
    this._$?.unsubscribe();
  }
}
