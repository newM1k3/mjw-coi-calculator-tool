export interface COIData {
  clientName: string;
  projectName: string;
  proposalPrice: number;

  employeesAffected: number;
  averageHourlyWage: number;
  hoursWastedPerWeek: number;

  lostLeadsPerMonth: number;
  averageLeadValue: number;
}

export interface CalculatedCOI {
  monthlyLeakage: number;
  yearOneCost: number;
  yearThreeCost: number;
  yearFiveCost: number;
  roiMonths: number;
}
