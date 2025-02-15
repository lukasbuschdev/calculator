import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import es from '../../assets/languages/es.json';
import en from '../../assets/languages/en.json';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public isActiveLanguage = 'es';

  constructor() { 
    this.switchLanguage(this.isActiveLanguage)
  }

  switchLanguage(languageCode: string): void {
    this.isActiveLanguage = languageCode;
    console.log(this.isActiveLanguage)
  }

  translate(key: any): string {
    const translation = this.getActive()[key as keyof typeof this.getActive];
    return Array.isArray(translation) ? key : translation;  
  }

  getFrequencies(): string[] {
    return this.getActive()['selectable-frequencies'];
  }

  getActive(): typeof en {
    return this.isActiveLanguage == 'es' ? es : en;
  }
}
