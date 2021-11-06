import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { PortfoliosAPI } from './services/portfolios.service';
import { MatCardModule } from '@angular/material/card';
import { TableComponent } from './components/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import {
  PortfolioEffects,
  PortfolioReducer,
  PortfolioState,
  PORTFOLIO_FEATURE_KEY,
  StocksEffects,
  StocksReducer,
  StocksState,
  STOCKS_FEATURE_KEY,
} from './store';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AddPortfolioComponent } from './components/add-portfolio/add-portfolio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MyPortfoliosComponent } from './components/my-portfolios/my-portfolios.component';
import { SharedModule } from '../shared/shared.module';
import { AddTickerComponent } from './components/add-ticker/add-ticker.component';
import { StocksAPI } from './services/stocks.service';

export interface MainState {
  [STOCKS_FEATURE_KEY]: StocksState;
  [PORTFOLIO_FEATURE_KEY]: PortfolioState;
}

export const reducers: ActionReducerMap<MainState> = {
  [STOCKS_FEATURE_KEY]: StocksReducer,
  [PORTFOLIO_FEATURE_KEY]: PortfolioReducer,
};

@NgModule({
  declarations: [
    HomeComponent,
    TableComponent,
    AddPortfolioComponent,
    MyPortfoliosComponent,
    AddTickerComponent,
  ],
  providers: [PortfoliosAPI, StocksAPI],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatStepperModule,
    MatAutocompleteModule,
    StoreModule.forFeature('main', reducers),
    EffectsModule.forFeature([PortfolioEffects, StocksEffects]),
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
    SharedModule,
  ],
})
export class MainModule {}
