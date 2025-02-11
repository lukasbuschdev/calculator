import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private translationsSubject = new BehaviorSubject<any>({});
  public translations$ = this.translationsSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadTranslations(languageCode: string): Observable<any> {
    return this.http.get(`./assets/languages/${languageCode}.json`);
  }

  switchLanguage(languageCode: string): void {
    this.loadTranslations(languageCode).subscribe({
      next: (data) => {
        this.translationsSubject.next(data);
      },
      error: (err) => console.error(err)
    });
  }

  translate(key: string): string {
    const translations = this.translationsSubject.getValue();
    return translations[key] || key;
  }
}
