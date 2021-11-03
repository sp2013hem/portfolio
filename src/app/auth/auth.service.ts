import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { from, Observable, of } from 'rxjs';
import { catchError, delay, map, switchMap } from 'rxjs/operators';
import { UserModel } from '../core/models/user.model';
declare var gapi: any;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireAuthService: AngularFireAuth) {}
  checkAuth(): Observable<UserModel | null> {
    return this.fireAuthService.authState.pipe(
      map((res) =>
        !res
          ? null
          : ({
              uid: res.uid,
              email: res.email,
              photoURL: res.photoURL,
              displayName: res.displayName,
            } as UserModel)
      ),
      catchError((err) => of(err))
    );
  }
  login(): Observable<UserModel | null> {
    return from(
      this.fireAuthService.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      )
    ).pipe(
      map(
        (res: any) =>
          ({
            uid: res.user.uid,
            email: res.user.email,
            photoURL: res.user.photoURL,
            displayName: res.user.displayName,
          } as UserModel)
      ),
      catchError((err) => of(err))
    );
  }
  logout(): Observable<void | any> {
    return from(this.fireAuthService.signOut());
  }
}
