import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Portfolio } from 'src/app/core/models/stocks.model';
import { PortfolioActions } from '../../store';
import { AddPortfolioComponent } from '../add-portfolio/add-portfolio.component';

@Component({
  selector: 'app-my-portfolios',
  templateUrl: './my-portfolios.component.html',
  styleUrls: ['./my-portfolios.component.scss'],
})
export class MyPortfoliosComponent implements OnDestroy {
  dialogRef;
  progress = 0;
  @Input() portfolios: Portfolio[];

  openDialog() {
    const ref = this.dialog.open(AddPortfolioComponent);
    this.dialogRef?.unsubscribe();
    this.dialogRef = ref
      .afterClosed()
      .pipe(filter((d) => !!d))
      .subscribe({
        next: () => this.store.dispatch(PortfolioActions.RequestMyPortfolios()),
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
    this.dialogRef?.unsubscribe();
  }
}
