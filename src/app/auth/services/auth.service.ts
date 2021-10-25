import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/core/models/user.model';

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
      )
    );
  }
  signInWithGoogle(): Observable<UserModel> {
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
      )
    );
  }

  signOutWithGoogle(): Observable<void> {
    return from(this.fireAuthService.signOut());
  }
}
