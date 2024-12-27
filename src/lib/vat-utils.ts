import { StageData } from "@/types/vat";

export function calculateVATPrices(
  basePrice: number,
  margins: number[],
  vatRate: number,
): StageData[] {
  let currentPrice = basePrice;
  let totalVAT = 0;

  return margins.map((margin, index) => {
    const marginAmount = (currentPrice * margin) / 100;
    currentPrice += marginAmount;

    // Only calculate VAT if not at consumer level (last stage)
    const vatAmount = index < margins.length - 1 ? currentPrice * vatRate : 0;
    const finalPrice = currentPrice + vatAmount;

    currentPrice = finalPrice;
    totalVAT += vatAmount;

    return {
      price: finalPrice,
      vatAmount,
      totalVAT,
    };
  });
}

export function formatCurrency(amount: number): string {
  return `Rp ${Math.round(amount).toLocaleString("id-ID")}`;
}

export const STAGES = ["Pabrik", "Distributor", "Toko", "Konsumen"] as const;
export const DEFAULT_MARGINS = [0, 20, 50, 0];
export const DEFAULT_VAT_RATES = [11, 12];
