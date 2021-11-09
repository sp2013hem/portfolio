import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, delay, map, mapTo, switchMap, tap } from 'rxjs/operators';
import { Portfolio } from 'src/app/core/models/stocks.model';

@Injectable({ providedIn: 'root' })
export class PortfoliosAPI {
  constructor(private fireStoreService: AngularFirestore) {}

  getPortfolios(uid: string): Observable<Portfolio[]> {
    // return of([
    //   {
    //     caption: 'ads',
    //     isMain: true,
    //     name: 'sadads',
    //     uid: Math.random().toString(),
    //   },
    //   {
    //     caption: 'ads',
    //     isMain: false,
    //     name: '21',
    //     uid: Math.random().toString(),
    //   },
    //   {
    //     caption: 'ads',
    //     isMain: false,
    //     name: 'IB',
    //     uid: Math.random().toString(),
    //   },
    // ]).pipe(delay(200));
    return this.fireStoreService
      .collection(`/users/${uid}/portfolios`)
      .get()
      .pipe(
        map((snap) =>
          snap.docs.map((doc) => {
            return { uid: doc.id, ...(doc.data() as object) } as Portfolio;
          })
        ),
        catchError((err) => of(err))
      );
  }

  createPortfolio(
    data: { name: string; isMain: boolean },
    uid: string
  ): Observable<boolean> {
    // return of(true).pipe(delay(2000));
    return from(
      this.fireStoreService
        .collection(`/users/${uid}/portfolios`)
        .doc(this.fireStoreService.createId())
        .set(data)
    ).pipe(
      mapTo(true),
      catchError((err) => of(err))
    );
  }

  deletePortfolio(userId: string, uid: string): Observable<boolean> {
    // return of(true).pipe(delay(2000));
    return from(
      this.fireStoreService
        .collection(`/users/${userId}/portfolios`)
        .doc(uid)
        .delete()
    ).pipe(
      mapTo(true),
      catchError((err) => of(err))
    );
  }
}
