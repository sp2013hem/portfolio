import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  impersonate = null;

  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const DEFAULT_URL = '';

    req = req.clone({
      headers: req.headers.set('User-Agent', 'request'),
    });

    /* #region  login redirection */
    return next.handle(req).pipe(
      tap((d: any) => {
        if (d.headers) {
          d.body.headers = d.headers;
        }
        return d;
      })
    );
    /* #endregion */
  }
}
