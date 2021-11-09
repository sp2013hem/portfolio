import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Portfolio, TickerData } from 'src/app/core/models/stocks.model';
import { EntriesSelectors, PortfolioSelectors } from '../../store';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit, OnInit, OnDestroy {
  _$: Record<string, Subscription> = {};
  dataSource;
  displayedColumns: string[] = ['ticker', 'currentPrice', 'quantity', 'price'];
  @Input() portfolio: Portfolio;
  @Output() openTicker: EventEmitter<String> = new EventEmitter<String>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  processingEntries$ = this.store.select(EntriesSelectors.processingEntries);
  // .pipe(
  //   tap((data) => {
  //     debugger;
  //   })
  // );
  entries$ = this.store.select(EntriesSelectors.entries).pipe(
    tap((data) => {
      this.dataSource.data = data;
    })
  );

  constructor(private store: Store) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<TickerData>([]);
    this._$.select = this.store
      .select(PortfolioSelectors.Portfolios)
      .pipe(
        map((portfolios) =>
          portfolios.find((e) => e.uid === this.portfolio.uid)
        )
      )
      .subscribe(() => (this.dataSource.data = []));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy() {
    this._$.forEach((value) => value?.unsubscribe());
  }
}
