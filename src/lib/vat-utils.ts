import { StageData } from "@/types/vat";

export function calculateVATPrices(
  basePrice: number,
  margins: number[],
  vatRate: number,
): StageData[] {
  let currentPrice = basePrice;
  let totalVAT = 0;
  let previousVAT = 0;

  return margins.map((margin, index) => {
    const marginAmount = (currentPrice * margin) / 100;
    const priceBeforeVAT = currentPrice + marginAmount;

    let inputVAT = 0;
    let outputVAT = 0;
    let vatAmount = 0;

    if (index === 0) {
      outputVAT = priceBeforeVAT * vatRate;
      vatAmount = outputVAT;
      previousVAT = outputVAT;
    } else if (index < margins.length - 1) {
      inputVAT = previousVAT;
      outputVAT = priceBeforeVAT * vatRate;
      vatAmount = outputVAT - inputVAT;
      previousVAT = outputVAT;
    }

    const finalPrice = priceBeforeVAT + vatAmount;
    currentPrice = finalPrice;
    totalVAT += vatAmount;

    return {
      price: finalPrice,
      inputVAT,
      outputVAT,
      netVAT: outputVAT - inputVAT,
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
