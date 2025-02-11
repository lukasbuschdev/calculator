import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../../exchange-rate.service';
import { CommonModule } from '@angular/common';
import { SalaryClass } from '../../types/salary-class.type';

@Component({
  selector: 'app-calculation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent implements OnInit {
  currencies: any;
  selectedCurrency: string = 'MXN';
  selectedFrequency: string = 'Yearly';
  selectableCurrencies: string[] = ['MXN', 'USD', 'EUR', 'CAD', 'CHF', 'GBP'];
  selectableFrequencies: string[] = ['Semi monthly', 'Monthly', 'Yearly'];
  isCurrencyOpened: boolean = false;
  isFrequencyOpened: boolean = false;
  isSelected: boolean = false;
  result: number = 0;
  monthlySalary: string = '0';
  yearlySalary: string = '0';
  taxPaidYearly: string = '0';
  taxPaidMonthly: string = '0';

  salaryClasses: SalaryClass[] = [
    { min: 0,         max: 746.04,    label: 'Class 1',  fee: 0,         percent: 1.92  },
    { min: 746.05,    max: 6332.05,   label: 'Class 2',  fee: 14.23,     percent: 6.40  },
    { min: 6332.06,   max: 11128.01,  label: 'Class 3',  fee: 371.83,    percent: 10.88 },
    { min: 11128.02,  max: 12935.82,  label: 'Class 4',  fee: 893.63,    percent: 16.00 },
    { min: 12935.83,  max: 15487.71,  label: 'Class 5',  fee: 1182.88,   percent: 17.92 },
    { min: 15487.72,  max: 31236.49,  label: 'Class 6',  fee: 1640.18,   percent: 21.36 },
    { min: 31236.50,  max: 49233.00,  label: 'Class 7',  fee: 5004.12,   percent: 23.52 },
    { min: 49233.01,  max: 93993.90,  label: 'Class 8',  fee: 9236.89,   percent: 30.00 },
    { min: 93993.91,  max: 125325.20, label: 'Class 9',  fee: 22665.17,  percent: 32.00 },
    { min: 125325.21, max: 375975.61, label: 'Class 10', fee: 32691.17,  percent: 34.00 },
    { min: 375975.62, max: Infinity,  label: 'Class 11', fee: 132691.18, percent: 35.00 }
  ];
  
  constructor(private exchangeRateService: ExchangeRateService) {}

  ngOnInit(): void {
    this.exchangeRateService.getExchangeRates().subscribe({
      next: (data) => {
        this.currencies = data.data;
      },
      error: (err) => console.error('Error fetching exchange rates!', err)
    });
  }

  openCurrencies(event: MouseEvent) {
    event.stopPropagation();
    this.isCurrencyOpened = true;
  }
  
  openFrequencies(event: MouseEvent) {
    event.stopPropagation();
    this.isFrequencyOpened = true;
  }

  selectCurrency(selected: string) {
    this.selectedCurrency = selected;
    this.closeCurrencies();
  }

  selectFrequency(selected: string) {
    this.selectedFrequency = selected;
    this.closeFrequencies();
  }
  
  closeCurrencies() {
    this.isCurrencyOpened = false;
  }

  closeFrequencies() {
    this.isFrequencyOpened = false;
  }

  selectPaymentFrequency(selected: string) {
    this.selectedFrequency = selected;
  }

  calculate(salary: string) {
    const convertedSalary = this.convertCurrency(salary);
    const convertedYearlySalary = this.convertToYearlySalary(convertedSalary);
    const salaryClass = this.checkSalaryRange(convertedYearlySalary);
    const calculatedSalary = this.calculateSalary(convertedSalary, salaryClass);

    const formattedYearlySalary = this.formatNumber(Number(calculatedSalary.toFixed(2)));
    const formattedMonthlySalary = this.formatNumber(Number((calculatedSalary / 12).toFixed(2)));

    this.yearlySalary = formattedYearlySalary;
    this.monthlySalary = formattedMonthlySalary;
  }

  convertCurrency(salary: string): number {
    const amount = Number(salary);
    const rateSelected = this.currencies[this.selectedCurrency].toFixed(2);
    const rateMXN = this.currencies['MXN'].toFixed(2);

    const salaryInMXN = ((amount / rateSelected) * rateMXN).toFixed(2);
    return Number(salaryInMXN);
  }

  convertToYearlySalary(convertedSalary: number): number { 
    if(this.selectedFrequency.toLocaleLowerCase() === 'monthly') return convertedSalary * 12;
    if(this.selectedFrequency.toLocaleLowerCase() === 'semi monthly') return convertedSalary * 2 * 12;
    return convertedSalary;
  }

  checkSalaryRange(convertedSalary: number): SalaryClass {
    const salaryClass = this.salaryClasses.find(
      (salary: SalaryClass) => convertedSalary > salary.min && convertedSalary <= salary.max
    );

    return salaryClass ? salaryClass : { min: 0, max: 0, label: 'Unknown', fee: 0, percent: 0 };
  }

  calculateSalary(convertedSalary: number, salaryClass: SalaryClass): number {
    const taxYearly = (convertedSalary - salaryClass.min) * (salaryClass.percent / 100) + salaryClass.fee;
    const taxMonthly = taxYearly / 12;

    this.taxPaidYearly = this.formatNumber(Number(taxYearly.toFixed(2)));
    this.taxPaidMonthly = this.formatNumber(Number(taxMonthly.toFixed(2)));

    const calculatedSalary = convertedSalary - taxYearly;

    return Number(calculatedSalary.toFixed(2));
  }

  formatNumber(num: number): string {
    const parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
}
