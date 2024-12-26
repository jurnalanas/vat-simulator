"use client";

import { useState, useEffect } from "react";
import { Footer } from "./vat/footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VATRateSection } from "./vat/vat-rate-section";
import { MarginControls } from "./vat/margin-controls";
import { Summary } from "./vat/summary";
import {
  calculateVATPrices,
  formatCurrency,
  DEFAULT_MARGINS,
  DEFAULT_VAT_RATES,
} from "@/lib/vat-utils";

export default function VATComparison() {
  const [basePrice, setBasePrice] = useState(5000);
  const [margins, setMargins] = useState(DEFAULT_MARGINS);
  const [vatRates, setVatRates] = useState(DEFAULT_VAT_RATES);
  const [progress, setProgress] = useState(0);

  const prices1 = calculateVATPrices(basePrice, margins, vatRates[0] / 100);
  const prices2 = calculateVATPrices(basePrice, margins, vatRates[1] / 100);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(oldProgress + 1, 100);
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const currentStage = Math.min(Math.floor((progress / 100) * 4), 3);

  const handleMarginChange = (index: number, value: number[]) => {
    const newMargins = [...margins];
    newMargins[index] = value[0];
    setMargins(newMargins);
  };

  const handleVatRateChange = (index: number, value: number[]) => {
    const newVatRates = [...vatRates];
    newVatRates[index] = value[0];
    setVatRates(newVatRates);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 text-center font-display text-2xl font-bold text-slate-50 md:text-3xl">
        Perbandingan PPN Interaktif
      </h1>

      <div className="mb-8 space-y-6">
        <div className="rounded-lg bg-slate-50 p-6">
          <div className="space-y-4">
            <Label htmlFor="basePrice" className="text-lg font-medium">
              Harga Dasar (Rp)
            </Label>
            <Input
              id="basePrice"
              type="text"
              value={formatCurrency(basePrice)}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                setBasePrice(Number(value));
              }}
              className="h-12 text-lg shadow-sm"
            />
          </div>
        </div>

        <MarginControls margins={margins} onMarginChange={handleMarginChange} />
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <VATRateSection
          vatConfig={{
            rate: vatRates[0],
            isEditable: false,
            variant: "blue",
          }}
          margins={margins}
          prices={prices1}
          currentStage={currentStage}
          onVATRateChange={(value) => handleVatRateChange(0, value)}
        />
        <VATRateSection
          vatConfig={{
            rate: vatRates[1],
            isEditable: true,
            variant: "green",
          }}
          margins={margins}
          prices={prices2}
          currentStage={currentStage}
          onVATRateChange={(value) => handleVatRateChange(1, value)}
        />
      </div>

      <Summary vatRates={vatRates} prices1={prices1} prices2={prices2} />

      <Footer />
    </div>
  );
}
