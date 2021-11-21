import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, delay, map, mapTo } from 'rxjs/operators';
import { Entry, EntryPayload } from 'src/app/core/models/stocks.model';

@Injectable({ providedIn: 'root' })
export class EntriesAPI {
  constructor(private fireStoreService: AngularFirestore) {}

  get(uid: string, pid: string): Observable<Entry[]> {
    return this.fireStoreService
      .collection(`/users/${uid}/portfolios/${pid}/entries`)
      .get()
      .pipe(
        map((snap) =>
          snap.docs.map((doc) => {
            return {
              uid: doc.id,
              ...(doc.data() as object),
            } as Entry;
          })
        ),
        catchError((err) => of(err))
      );
  }

  create(data: EntryPayload, uid: string, pid: string): Observable<boolean> {
    // return of(true).pipe(delay(2000));
    return from(
      this.fireStoreService
        .collection(`/users/${uid}/portfolios/${pid}/entries`)
        .doc(this.fireStoreService.createId())
        .set(data)
    ).pipe(
      mapTo(true),
      catchError((err) => of(err))
    );
  }

  delete(uid: string, pid: string, eid: string): Observable<boolean> {
    // return of(true).pipe(delay(2000));
    return from(
      this.fireStoreService
        .collection(`/users/${uid}/portfolios/${pid}/entries`)
        .doc(eid)
        .delete()
    ).pipe(
      mapTo(true),
      catchError((err) => of(err))
    );
  }

  edit(
    data: EntryPayload,
    uid: string,
    pid: string,
    eid: string
  ): Observable<boolean> {
    // return of(true).pipe(delay(2000));
    return from(
      this.fireStoreService
        .collection(`/users/${uid}/portfolios/${pid}/entries`)
        .doc(eid)
        .update(data)
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
