import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StocksAPI } from './core/services/stocks.service';
import { SharedPipesModule } from './shared/modules/pipes/pipes.module';
import { SideNavModule } from './shared/modules/side-nav/side-nav.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AppRoutingModule,
    SharedModule,
    SideNavModule,
    SharedPipesModule,
  ],
  providers: [StocksAPI],
  bootstrap: [AppComponent],
})
export class AppModule {}
