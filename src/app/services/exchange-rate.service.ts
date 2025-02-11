import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private apiUrl = 'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_GAQf8NLbz2qDxPUlb9FY53Abq8ydcOEd6f9YltZG';
  private cachedData: any = null;
  private lastFetchTime: number = 0;
  private readonly cacheDuration: number = 3600000 * 6; // 6 hours in milliseconds

  constructor(private http: HttpClient) {
    if(localStorage.getItem('data') === null) return;
    if(localStorage.getItem('time') === null) return;
    this.cachedData = localStorage.getItem('data');
    this.lastFetchTime = Number(localStorage.getItem('time'));
  }

  getExchangeRates(): Observable<any> {
    const now = Date.now();

    if(this.cachedData && (now - this.lastFetchTime) < this.cacheDuration) return of(JSON.parse(this.cachedData));
    
    return this.http.get(this.apiUrl).pipe(
      tap(data => {
        this.cachedData = data;
        this.lastFetchTime = Date.now();
        localStorage.setItem('data', JSON.stringify(this.cachedData));
        localStorage.setItem('time', JSON.stringify(this.lastFetchTime));
      })  
    );
  }
}
