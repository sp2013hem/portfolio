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
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Entry, Portfolio, TickerData } from 'src/app/core/models/stocks.model';
import { EntriesSelectors, PortfolioSelectors } from '../../store';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class TableComponent implements AfterViewInit, OnInit, OnDestroy {
  _$: Record<string, Subscription> = {};
  dataSource;
  displayedColumns: string[] = ['ticker', 'quantity', 'price'];
  nestedTableDisplayedColumns: string[] = [
    'quantity',
    'price',
    'fees',
    'actions',
  ];
  @Input() portfolio: Portfolio;
  @Output() openTicker: EventEmitter<String> = new EventEmitter<String>();
  @Output() editEntry: EventEmitter<String> = new EventEmitter<String>();
  @Output() deleteEntry: EventEmitter<String> = new EventEmitter<String>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  processingEntries$ = this.store.select(EntriesSelectors.processingEntries);
  entries$ = this.store.select(EntriesSelectors.AllEntries).pipe(
    switchMap((entries) =>
      this.store.select(EntriesSelectors.entries).pipe(
        tap(
          (data) =>
            (this.dataSource.data = data.map((d) => {
              const dataSource = new MatTableDataSource<Entry>([]);
              dataSource.data = entries
                .filter((e) => e.ticker === d.ticker)
                .map((e) => ({ ...e, currentPrice: d.currentPrice }));
              return {
                ...d,
                entries: dataSource,
              };
            }))
        )
      )
    )
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
