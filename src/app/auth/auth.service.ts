import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, mapTo, switchMap } from 'rxjs/operators';
import { UserModel } from '../core/models/user.model';
declare var gapi: any;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireAuthService: AngularFireAuth,
    private fireStoreService: AngularFirestore
  ) {}
  checkAuth(): Observable<UserModel | null> {
    return this.fireAuthService.authState.pipe(
      switchMap((res) => this.checkAndCreateUserDoc(res)),
      catchError((err) => of(err))
    );
  }
  login(): Observable<UserModel | null> {
    return from(
      this.fireAuthService.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      )
    ).pipe(
      switchMap((res) => this.checkAndCreateUserDoc(res?.user)),
      // map(
      //   (res: any) =>
      //     ({
      //       uid: res.user.uid,
      //       email: res.user.email,
      //       photoURL: res.user.photoURL,
      //       displayName: res.user.displayName,
      //     } as UserModel)
      // ),
      catchError((err) => of(err))
    );
  }
  logout(): Observable<void | any> {
    return from(this.fireAuthService.signOut());
  }
  checkAndCreateUserDoc(res: any) {
    if (!res || !res?.uid) {
      return throwError(null);
    }
    return this.fireStoreService
      .doc('/users/' + res.uid)
      .get()
      .pipe(
        switchMap((doc) => {
          if (!doc.exists) {
            return from(
              this.fireStoreService.collection('users').doc(res.uid).set({})
            ).pipe(mapTo(true));
          } else {
            return of(true);
          }
        }),
        map((data) =>
          data
            ? ({
                uid: res.uid,
                email: res.email,
                photoURL: res.photoURL,
                displayName: res.displayName,
              } as UserModel)
            : null
        )
      );
  }
}
