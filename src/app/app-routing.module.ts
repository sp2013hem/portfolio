import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CheckSignedInGuard } from './auth/guards/check-signed-in.guard';
import { CheckSignedOutGuard } from './auth/guards/check-signed-out.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/shell.module').then((m) => m.ShellModule),
    // canActivate: [CheckSignedInGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    // canActivate: [CheckSignedOutGuard],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'prefix',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: !environment.production,
      relativeLinkResolution: 'legacy',
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
