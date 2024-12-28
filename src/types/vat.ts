export interface StageData {
  price: number;
  inputVAT: number;
  outputVAT: number;
  netVAT: number;
  totalVAT: number;
}

export interface StageConfig {
  name: string;
  icon: React.ReactNode;
  margin: number;
  vat: number;
  price: number;
  inputVAT: number;
  outputVAT: number;
  netVAT: number;
}

export interface VATCalculationResult {
  prices: StageData[];
  totalVAT: number;
}

export interface VATRateConfig {
  rate: number;
  isEditable: boolean;
  variant: "blue" | "green";
}
