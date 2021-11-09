import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Portfolio } from 'src/app/core/models/stocks.model';
import { EntriesActions, PortfolioActions } from '../../store';
import { AddPortfolioComponent } from '../add-portfolio/add-portfolio.component';
import { AddTickerComponent } from '../add-ticker/add-ticker.component';

@Component({
  selector: 'app-my-portfolios',
  templateUrl: './my-portfolios.component.html',
  styleUrls: ['./my-portfolios.component.scss'],
})
export class MyPortfoliosComponent implements OnDestroy {
  _$: Record<string, Subscription> = {};
  progress = 0;
  @Input() portfolios: Portfolio[];

  onPortFolioExpanded(pid) {
    this.store.dispatch(EntriesActions.GetEntriesRequest({ pid }));
  }
  openDialog() {
    const ref = this.dialog.open(AddPortfolioComponent, {
      autoFocus: false,
      hasBackdrop: true,
      disableClose: false,
      minWidth: '100%',
      maxWidth: '600px',
      minHeight: '350px',
    });
    this._$.dialogRef?.unsubscribe();
    this._$.dialogRef = ref
      .afterClosed()
      .pipe(filter((d) => !!d))
      .subscribe({
        next: () => this.store.dispatch(PortfolioActions.RequestMyPortfolios()),
      });
  }
  openTickerDialog(uid: string) {
    const ref = this.dialog.open(AddTickerComponent, {
      autoFocus: false,
      hasBackdrop: true,
      disableClose: false,
      minWidth: '100%',
      maxWidth: '600px',
      minHeight: '500px',
      data: uid,
    });
    this._$.dialogTickerRef?.unsubscribe();
    this._$.dialogTickerRef = ref
      .afterClosed()
      .pipe(filter((d) => !!d))
      .subscribe({
        next: (payload) =>
          this.store.dispatch(
            EntriesActions.EntriesCreatedRequested({ payload, pid: uid })
          ),
      });
  }
  deletePortfolio(e, uid: string) {
    this.progress = e / 10;
    if (this.progress > 100) {
      this.store.dispatch(
        PortfolioActions.RequestDeletePortfolio({ uid: uid })
      );
    }
  }

  constructor(public dialog: MatDialog, private store: Store) {}

  ngOnDestroy() {
    this._$.forEach((value) => value?.unsubscribe());
  }
}
