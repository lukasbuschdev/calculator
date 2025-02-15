import { SalaryClass } from "../types/types";

export class SalaryClasses {
    static monthly: SalaryClass[] = [
        { min: 0,         max: 746.04,    fee: 0,         percent: 1.92  },
        { min: 746.05,    max: 6332.05,   fee: 14.23,     percent: 6.40  },
        { min: 6332.06,   max: 11128.01,  fee: 371.83,    percent: 10.88 },
        { min: 11128.02,  max: 12935.82,  fee: 893.63,    percent: 16.00 },
        { min: 12935.83,  max: 15487.71,  fee: 1182.88,   percent: 17.92 },
        { min: 15487.72,  max: 31236.49,  fee: 1640.18,   percent: 21.36 },
        { min: 31236.50,  max: 49233.00,  fee: 5004.12,   percent: 23.52 },
        { min: 49233.01,  max: 93993.90,  fee: 9236.89,   percent: 30.00 },
        { min: 93993.91,  max: 125325.20, fee: 22665.17,  percent: 32.00 },
        { min: 125325.21, max: 375975.61, fee: 32691.17,  percent: 34.00 },
        { min: 375975.62, max: Infinity,  fee: 132691.18, percent: 35.00 }
    ];
    
    static semiMonthly: SalaryClass[] = [
        { min: 0.01,       max: 368.10,     fee: 0,         percent: 1.92  },
        { min: 368.11,     max: 3124.35,    fee: 7.05,      percent: 6.40  },
        { min: 3124.36,    max: 5490.75,    fee: 183.45,    percent: 10.88 },
        { min: 5490.76,    max: 6382.80,    fee: 441,       percent: 16.00 },
        { min: 6382.81,    max: 7641.90,    fee: 583.65,    percent: 17.92 },
        { min: 7641.91,    max: 15412.80,   fee: 809.25,    percent: 21.36 },
        { min: 15412.81,   max: 24292.65,   fee: 2469.15,   percent: 23.52 },
        { min: 24292.66,   max: 46378.50,   fee: 4557.75,   percent: 30.00 },
        { min: 46378.51,   max: 61838.10,   fee: 11183.40,  percent: 32.00 },
        { min: 61838.11,   max: 185514.30,  fee: 16130.55,  percent: 34.00 },
        { min: 185514.31,  max: Infinity,   fee: 58180.35,  percent: 35.00 }
    ];
    
    static tenDays: SalaryClass[] = [
        { min: 0.01,       max: 245.40,     fee: 0,         percent: 1.92  },
        { min: 245.41,     max: 2082.90,    fee: 4.7,       percent: 6.40  },
        { min: 2082.91,    max: 3660.50,    fee: 122.3,     percent: 10.88 },
        { min: 3660.51,    max: 4255.20,    fee: 294,       percent: 16.00 },
        { min: 4255.21,    max: 5094.60,    fee: 389.10,    percent: 17.92 },
        { min: 5094.61,    max: 10275.20,   fee: 539.50,    percent: 21.36 },
        { min: 10275.21,   max: 16195.10,   fee: 1646.10,   percent: 23.52 },
        { min: 16195.11,   max: 30919.00,   fee: 3038.50,   percent: 30.00 },
        { min: 30919.01,   max: 41255.40,   fee: 7455.60,   percent: 32.00 },
        { min: 41255.41,   max: 123676.20,  fee: 10753.70,  percent: 34.00 },
        { min: 123676.21,  max: Infinity,   fee: 38786.90,  percent: 35.00 }
    ];
    
    static weekly: SalaryClass[] = [
        { min: 0.01,       max: 171.78,     fee: 0,         percent: 1.92  },
        { min: 171.79,     max: 1458.03,    fee: 3.29,      percent: 6.40  },
        { min: 1458.04,    max: 2562.35,    fee: 85.61,     percent: 10.88 },
        { min: 2562.36,    max: 2978.64,    fee: 205.8,     percent: 16.00 },
        { min: 2978.65,    max: 3566.22,    fee: 272.37,    percent: 17.92 },
        { min: 3566.23,    max: 7192.64,    fee: 377.65,    percent: 21.36 },
        { min: 7192.65,    max: 11336.57,   fee: 1152.27,   percent: 23.52 },
        { min: 11336.58,   max: 21643.30,   fee: 2126.95,   percent: 30.00 },
        { min: 21643.31,   max: 28857.78,   fee: 5218.92,   percent: 32.00 },
        { min: 28857.79,   max: 86573.34,   fee: 7527.59,   percent: 34.00 },
        { min: 86573.35,   max: Infinity,   fee: 27150.83,  percent: 35.00 }
    ];
    
    static daily: SalaryClass[] = [
        { min: 0.01,       max: 24.54,      fee: 0,         percent: 1.92  },
        { min: 24.55,      max: 208.29,     fee: 0.47,      percent: 6.40  },
        { min: 208.30,     max: 366.05,     fee: 12.23,     percent: 10.88 },
        { min: 366.06,     max: 425.52,     fee: 29.4,      percent: 16.00 },
        { min: 425.53,     max: 509.46,     fee: 38.91,     percent: 17.92 },
        { min: 509.47,     max: 1027.52,    fee: 53.95,     percent: 21.36 },
        { min: 1027.53,    max: 1619.51,    fee: 164.61,    percent: 23.52 },
        { min: 1619.52,    max: 3091.90,    fee: 303.85,    percent: 30.00 },
        { min: 3091.91,    max: 4122.54,    fee: 745.56,    percent: 32.00 },
        { min: 4122.55,    max: 12367.62,   fee: 1075.37,   percent: 34.00 },
        { min: 12367.63,   max: Infinity,   fee: 3878.69,   percent: 35.00 }
    ];

    static getSalaryClass(period: string) {
        if(period === 'Semi monthly' || period === 'Quincenal') return SalaryClasses.semiMonthly;
        if(period === '10 Days' || period === 'Decenal') return SalaryClasses.tenDays;
        if(period === 'Weekly' || period === 'Semanal') return SalaryClasses.weekly;
        if(period === 'Daily' || period === 'Diaria') return SalaryClasses.daily;
        return SalaryClasses.monthly;
    }
}