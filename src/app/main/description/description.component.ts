import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../language.service';

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [],
  templateUrl: './description.component.html',
  styleUrl: './description.component.scss'
})
export class DescriptionComponent implements OnInit {
  constructor(public languageService: LanguageService) { }

  ngOnInit(): void {
    this.languageService.switchLanguage('es');
  }
}
