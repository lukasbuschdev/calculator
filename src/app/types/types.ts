export type SalaryClass = {
    min: number;
    max: number;
    fee: number;
    percent: number;
}

export type exchangeRates = {
    [key: string]: number;
}