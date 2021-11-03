import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AuthSelectors } from 'src/app/auth/store';
import { AddPortfolioComponent } from '../components/add-portfolio/add-portfolio.component';
import { PortfolioActions, PortfolioSelectors } from '../store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy, OnInit {
  panelOpenState;
  dialogRef;
  _$ = this.store
    .select(AuthSelectors.isAuthenticated)
    .pipe(filter((d) => !d))
    .subscribe(() => this.router.navigate(['/login']));

  processingMyPortfolios$ = this.store.select(
    PortfolioSelectors.processingMyPortfolios
  );
  user$ = this.store.select(AuthSelectors.UserInfo);
  portfolios$ = this.store.select(PortfolioSelectors.Portfolios);

  openDialog() {
    const ref = this.dialog.open(AddPortfolioComponent);

    this.dialogRef = ref.afterClosed().subscribe((data) => {
      if (data) {
        this.store.dispatch(PortfolioActions.RequestMyPortfolios());
        // this.dialogRef?.unsubscribe();
      }
    });
  }

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(PortfolioActions.RequestMyPortfolios());
  }
  ngOnDestroy() {
    this.dialogRef?.unsubscribe();
    this._$.unsubscribe();
  }
}
