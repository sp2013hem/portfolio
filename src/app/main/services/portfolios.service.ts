import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, delay, map, mapTo, switchMap, tap } from 'rxjs/operators';
import { Portfolio } from 'src/app/core/models/stocks.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PortfoliosAPI {
  constructor(private fireStoreService: AngularFirestore) {}

  getPortfolios(uid: string): Observable<Portfolio[]> {
    // return of([
    //   { isMain: true, name: Math.random().toString(), uid: Math.random().toString() },
    //   { isMain: false, name: '21', uid: Math.random().toString() },
    //   { isMain: false, name: 'IB', uid: Math.random().toString() },
    // ]).pipe(delay(2000));
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
  // getStockData(
  //   symbol: TICKER,
  //   interval: INTERVALS,
  //   amount: number
  // ): Observable<TickerData> {
  //   return from(
  //     this.self.timeSeries({ symbol, interval, amount }) as Promise<TickerData>
  //   );
  // }

  // TSLA$: Observable<TickerData> = this.PortfoliosAPI.getStockData(
  //   'TSLA',
  //   'daily',
  //   10
  // );
  // MSFT$: Observable<TickerData> = this.PortfoliosAPI.getStockData(
  //   'MSFT',
  //   'daily',
  //   10
  // );
  // V$: Observable<TickerData> = this.PortfoliosAPI.getStockData('V', 'daily', 10);
}
