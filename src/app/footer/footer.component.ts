import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  constructor(public languageService: LanguageService) { }

  ngOnInit(): void {
    this.languageService.switchLanguage('es');
  }
}
