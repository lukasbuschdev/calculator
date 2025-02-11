import { Component } from '@angular/core';
import { DescriptionComponent } from "./description/description.component";
import { CalculationComponent } from "./calculation/calculation.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [DescriptionComponent, CalculationComponent, DescriptionComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
