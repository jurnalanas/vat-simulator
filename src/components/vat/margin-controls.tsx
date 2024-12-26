"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { STAGES } from "@/lib/vat-utils";

interface MarginControlsProps {
  margins: number[];
  onMarginChange: (index: number, value: number[]) => void;
}

export function MarginControls({
  margins,
  onMarginChange,
}: MarginControlsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {margins.slice(1, 3).map((margin, index) => (
        <div key={index} className="rounded-lg bg-slate-50 p-6">
          <div className="space-y-4">
            <Label className="text-lg font-medium">
              Margin {STAGES[index + 1]} (%)
            </Label>
            <div className="px-2">
              <Slider
                value={[margin]}
                onValueChange={(value) => onMarginChange(index + 1, value)}
                max={100}
                step={1}
                className="py-4"
              />
              <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                <span>0%</span>
                <span className="text-base font-semibold text-foreground">
                  {margin}%
                </span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
