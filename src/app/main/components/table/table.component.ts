import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Portfolio, TickerData } from 'src/app/core/models/stocks.model';
import { PortfolioActions, PortfolioSelectors } from '../../store';
import { AddTickerComponent } from '../add-ticker/add-ticker.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit, OnInit, OnDestroy {
  _$: Record<string, Subscription> = {};
  dataSource;
  displayedColumns: string[] = ['ticker', 'value', 'position', 'pl', 'totalPL'];
  @Input() portfolio: Portfolio;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private store: Store) {}
  openDialog(uid: string) {
    const ref = this.dialog.open(AddTickerComponent, {
      autoFocus: false,
      hasBackdrop: true,
      disableClose: true,
      minWidth: '90%',
      maxWidth: '500px',
      minHeight: '500px',
      data: uid,
    });
    this._$.dialogRef?.unsubscribe();
    this._$.dialogRef = ref
      .afterClosed()
      .pipe(filter((d) => !!d))
      .subscribe({
        next: () => this.store.dispatch(PortfolioActions.RequestMyPortfolios()),
      });
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource<TickerData>([]);
    this._$.select = this.store
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
    this._$.forEach((value) => value?.unsubscribe());
  }
}
