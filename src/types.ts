export interface Calculation {
  id: string;
  timestamp: number;
  label: string; // e.g., "King Size • Firm"
  mrp: number;
  discountPercent: number;
  includeGst: boolean;
  finalPrice: number;
  tags: string[];
}

export interface Settings {
  defaultGstRate: number;
  currency: string;
  theme: 'light' | 'dark';
}
