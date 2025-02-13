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
  monthlySalary: string = '0';
  yearlySalary: string = '0';
  taxPaidYearly: string = '0';
  taxPaidMonthly: string = '0';






  
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

  calculate(): void {
    const convertedSalary = this.convertCurrency(this.salary);
    const convertedMonthlySalary = this.convertToMonthlySalary(convertedSalary);

    console.log(convertedMonthlySalary)

    const salaryClass = this.checkSalaryRange(convertedMonthlySalary);
    const calculatedSalary = this.calculateSalary(convertedMonthlySalary, salaryClass);

    const formattedYearlySalary = this.formatNumber(Number(calculatedSalary.toFixed(2)));
    const formattedMonthlySalary = this.formatNumber(Number((calculatedSalary / 12).toFixed(2)));

    this.yearlySalary = formattedYearlySalary;
    this.monthlySalary = formattedMonthlySalary;

    this.salary = '';
  }

  convertCurrency(salary: string): number {
    const amount = Number(salary);
    const rateSelected = this.currencies[this.selectedCurrency].toFixed(2);
    const rateMXN = this.currencies['MXN'].toFixed(2);

    const salaryInMXN = ((amount / rateSelected) * rateMXN).toFixed(2);
    return Number(salaryInMXN);
  }

  convertToMonthlySalary(salary: number): number { 
    console.log(salary)
    if(this.selectedFrequency === 'Yearly' || this.selectedFrequency === 'Anual') return Number(salary / 12);
    if(this.selectedFrequency === 'Semi monthly' || this.selectedFrequency === 'Quincenal') return Number(salary * 2);
    if(this.selectedFrequency === '10 Days' || this.selectedFrequency === 'Decenal') return Number(salary * 3);
    if(this.selectedFrequency === 'Weekly' || this.selectedFrequency === 'Semanal') return Number(salary * 4);
    if(this.selectedFrequency === 'Daily' || this.selectedFrequency === 'Diaria') return Number(salary * 30);
    return salary;
  }

  checkSalaryRange(convertedSalary: number): SalaryClass {
    const salaryClass = SalaryClasses.getSalaryClass(this.selectedFrequency).find(
      (salary: SalaryClass) => convertedSalary > salary.min && convertedSalary <= salary.max
    );

    // console.log(salaryClass)

    return salaryClass ? salaryClass : { min: 0, max: 0, fee: 0, percent: 0 };
  }

  calculateSalary(convertedSalary: number, salaryClass: SalaryClass): number {
    const taxMonthly = (convertedSalary - salaryClass.min) * (salaryClass.percent / 100) + salaryClass.fee;
    const taxYearly = taxMonthly * 12;
    
    this.taxPaidYearly = this.formatNumber(Number(taxYearly.toFixed(2)));
    this.taxPaidMonthly = this.formatNumber(Number(taxMonthly.toFixed(2)));
    
    const calculatedSalary = (convertedSalary - taxMonthly) * 12;
    
    return Number(calculatedSalary.toFixed(2));
  }

  formatNumber(num: number): string {
    const parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
}
