import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserModel } from 'src/app/core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireAuthService: AngularFireAuth) {}
  checkAuth(): Observable<UserModel | null> {
    return this.fireAuthService.authState.pipe(
      tap((r) => console.log('state:', r)),
      map((res) =>
        !res
          ? null
          : ({
              uid: res.uid,
              email: res.email,
              photoURL: res.photoURL,
              displayName: res.displayName,
            } as UserModel)
      )
    );
  }
  signInWithGoogle(): Observable<firebase.auth.UserCredential> {
    return from(
      this.fireAuthService.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      )
    ).pipe(
      tap((res) => res.user),
      catchError((err) => throwError(null))
    );
  }

  signOutWithGoogle(): Observable<void> {
    return from(this.fireAuthService.signOut());
  }
}
