import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent implements OnInit {
  constructor(public languageService: LanguageService) { }

  ngOnInit(): void {
    this.languageService.switchLanguage('es');
  }
}
