import { COIData, CalculatedCOI } from '../types';

export const calculateCOI = (data: COIData): CalculatedCOI => {
  const weeklyWageLoss = data.employeesAffected * data.averageHourlyWage * data.hoursWastedPerWeek;
  const monthlyWageLoss = weeklyWageLoss * 4.33;
  const monthlyRevenueLoss = data.lostLeadsPerMonth * data.averageLeadValue;

  const totalMonthlyLeakage = monthlyWageLoss + monthlyRevenueLoss;
  const yearlyLeakage = totalMonthlyLeakage * 12;

  const roiMonths =
    data.proposalPrice > 0 && totalMonthlyLeakage > 0
      ? data.proposalPrice / totalMonthlyLeakage
      : 0;

  return {
    monthlyLeakage: totalMonthlyLeakage,
    yearOneCost: yearlyLeakage,
    yearThreeCost: yearlyLeakage * 3,
    yearFiveCost: yearlyLeakage * 5,
    roiMonths: Number(roiMonths.toFixed(1)),
  };
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};
