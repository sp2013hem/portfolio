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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';

import {
  EntriesEffects,
  EntriesReducer,
  EntriesState,
  ENTRIES_FEATURE_KEY,
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
import { MyPortfoliosComponent } from './components/my-portfolios/my-portfolios.component';
import { SharedModule } from '../shared/shared.module';
import { AddTickerComponent } from './components/add-ticker/add-ticker.component';
import { StocksAPI } from './services/stocks.service';
import { MatNativeDateModule } from '@angular/material/core';
import { EntriesAPI } from './services/entries.service';
import { GetCurrencyPipe } from './pipes/get-currency.pipe';

export interface MainState {
  [STOCKS_FEATURE_KEY]: StocksState;
  [PORTFOLIO_FEATURE_KEY]: PortfolioState;
  [ENTRIES_FEATURE_KEY]: EntriesState;
}

export const reducers: ActionReducerMap<MainState> = {
  [STOCKS_FEATURE_KEY]: StocksReducer,
  [PORTFOLIO_FEATURE_KEY]: PortfolioReducer,
  [ENTRIES_FEATURE_KEY]: EntriesReducer,
};

@NgModule({
  declarations: [
    HomeComponent,
    TableComponent,
    AddPortfolioComponent,
    MyPortfoliosComponent,
    AddTickerComponent,
    GetCurrencyPipe,
  ],
  providers: [PortfoliosAPI, StocksAPI, EntriesAPI],
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
    MatButtonToggleModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    StoreModule.forFeature('main', reducers),
    EffectsModule.forFeature([PortfolioEffects, StocksEffects, EntriesEffects]),
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
