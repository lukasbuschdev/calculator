import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../../services/exchange-rate.service';
import { CommonModule } from '@angular/common';
import { SalaryClass } from '../../types/salary-class.type';
import { LanguageService } from '../../services/language.service';
import { FormsModule } from '@angular/forms';
import { SalaryClasses } from '../../classes/salary.class';

@Component({
  selector: 'app-calculation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent implements OnInit {
  salary: string = '';
  currencies: any;
  selectedCurrency: string = 'MXN';
  selectedFrequency: string = '';
  selectableCurrencies: string[] = ['MXN', 'USD', 'EUR', 'CAD', 'CHF', 'GBP'];
  selectableFrequencies: string[] = [];
  isCurrencyOpened: boolean = false;
  isFrequencyOpened: boolean = false;
  isSelected: boolean = false;
  result: number = 0;
  selectedSalary: number = 0;
  monthlySalary: number = 0;
  taxPaidSelected: number = 0;

  
  constructor(public languageService: LanguageService, private exchangeRateService: ExchangeRateService) {}

  ngOnInit(): void {
    this.languageService.switchLanguage('es');
    this.languageService.translations$.subscribe( translations => {
      if(translations) {
        this.selectableFrequencies = translations['selectable-frequencies'];
        this.selectedFrequency = translations['default-selected-frequency'] || 'Anual';
      }
    });

    this.exchangeRateService.getExchangeRates().subscribe({
      next: (data) => {
        this.currencies = data.data;
      },
      error: (err) => console.error('Error fetching exchange rates!', err)
    });
  }

  openCurrencies(event: MouseEvent): boolean {
    event.stopPropagation();
    if(this.isCurrencyOpened) return this.isCurrencyOpened = false;
    return this.isCurrencyOpened = true;
  }
  
  openFrequencies(event: MouseEvent): boolean {
    event.stopPropagation();
    if(this.isFrequencyOpened) return this.isFrequencyOpened = false;
    return this.isFrequencyOpened = true;
  }

  selectCurrency(selected: string): void {
    this.selectedCurrency = selected;
    this.closeCurrencies();
  }

  selectFrequency(selected: string): void {
    this.selectedFrequency = selected;
    this.closeFrequencies();
  }
  
  closeCurrencies(): void {
    this.isCurrencyOpened = false;
  }

  closeFrequencies(): void {
    this.isFrequencyOpened = false;
  }

  selectPaymentFrequency(selected: string): void {
    this.selectedFrequency = selected;
  }


  // CALCULATIONS

  calculate(): void {
    const convertedSalary = this.convertCurrency(this.salary);
    const salaryClass = this.checkSalaryRange(convertedSalary);
    const calculatedSalary = this.calculateSalary(convertedSalary, salaryClass);
    const convertedMonthlySalary = this.convertToMonthlySalary(calculatedSalary);

    const formattedCalculatedSalary = Number(calculatedSalary.toFixed(2));
    const formattedMonthlySalary = Number(convertedMonthlySalary.toFixed(2));

    this.selectedSalary = formattedCalculatedSalary;
    this.monthlySalary = formattedMonthlySalary;

    this.salary = '';
  }

  convertCurrency(salary: string): number {
    const amount = Number(salary);
    const rateSelected = this.currencies[this.selectedCurrency].toFixed(2);
    const rateMXN = this.currencies['MXN'].toFixed(2);

    const salaryInMXN = ((amount / rateSelected) * rateMXN).toFixed(2);

    if(this.selectedFrequency === 'Yearly' || this.selectedFrequency === 'Anual') return (Number(salaryInMXN) / 12);
    return Number(salaryInMXN);
  }

  convertToMonthlySalary(salary: number): number {
    if(this.selectedFrequency === 'Semi monthly' || this.selectedFrequency === 'Quincenal') return Number(salary * 2);
    if(this.selectedFrequency === '10 Days' || this.selectedFrequency === 'Decenal') return Number(salary * 3);
    if(this.selectedFrequency === 'Weekly' || this.selectedFrequency === 'Semanal') return Number(salary / 7 * 30);
    if(this.selectedFrequency === 'Daily' || this.selectedFrequency === 'Diaria') return Number(salary * 30);
    return salary;
  }

  checkSalaryRange(convertedSalary: number): SalaryClass {
    const salaryClass = SalaryClasses.getSalaryClass(this.selectedFrequency).find(
      (salary: SalaryClass) => convertedSalary > salary.min && convertedSalary <= salary.max
    );

    return salaryClass ? salaryClass : { min: 0, max: 0, fee: 0, percent: 0 };
  }

  calculateSalary(convertedSalary: number, salaryClass: SalaryClass): number {
    const taxSelected = (convertedSalary - salaryClass.min) * (salaryClass.percent / 100) + salaryClass.fee;
    this.taxPaidSelected = taxSelected;
    const calculatedSalary = (convertedSalary - taxSelected);
    
    return Number(calculatedSalary.toFixed(2));
  }

  formatNumber(num: number): string {
    const parts = num.toFixed(2).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
}
