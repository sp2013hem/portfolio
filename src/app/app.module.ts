import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedPipesModule } from './shared/modules/pipes/pipes.module';
import { SideNavModule } from './shared/modules/side-nav/side-nav.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthService } from './auth/services/auth.service';
import { CheckSignedInGuard } from './auth/guards/check-signed-in.guard';
import { CheckSignedOutGuard } from './auth/guards/check-signed-out.guard';
import {
  AUTH_FEATURE_KEY,
  reducer,
} from './shared/store/reducers/auth.reducer';
import { CheckAuthEffects } from './shared/store/effects/check-auth.effects';
import { SignInWithGoogleEffects } from './shared/store/effects/sign-in-with-google.effects';
import { SignOutEffects } from './shared/store/effects/sign-out.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
    AppRoutingModule,
    SharedModule,
    SideNavModule,
    SharedPipesModule,
    StoreModule.forRoot({
      [AUTH_FEATURE_KEY]: reducer,
    }),
    EffectsModule.forRoot([
      CheckAuthEffects,
      SignInWithGoogleEffects,
      SignOutEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [AuthService, CheckSignedInGuard, CheckSignedOutGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
