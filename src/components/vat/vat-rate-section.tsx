"use client";

import { motion } from "framer-motion";
import { Factory, Truck, Store, User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { StageData, VATRateConfig } from "@/types/vat";
import { STAGES } from "@/lib/vat-utils";
import { Stage } from "./stage";

interface VATRateSectionProps {
  vatConfig: VATRateConfig;
  margins: number[];
  prices: StageData[];
  currentStage: number;
  onVATRateChange: (value: number[]) => void;
}

const stageIcons = [
  <Factory key="factory" className="h-8 w-8" />,
  <Truck key="truck" className="h-8 w-8" />,
  <Store key="store" className="h-8 w-8" />,
  <User key="user" className="h-8 w-8" />,
];

export function VATRateSection({
  vatConfig,
  margins,
  prices,
  currentStage,
  onVATRateChange,
}: VATRateSectionProps) {
  return (
    <div
      className={cn(
        "w-full rounded-lg p-4 md:w-1/2",
        vatConfig.variant === "blue" ? "bg-blue-50" : "bg-green-50",
      )}
    >
      <div className="mb-6 space-y-2">
        <Label className={cn(!vatConfig.isEditable && "text-muted-foreground")}>
          PPN Rate (%)
        </Label>
        <div className="px-2">
          <Slider
            value={[vatConfig.rate]}
            disabled={!vatConfig.isEditable}
            onValueChange={onVATRateChange}
            max={25}
            step={0.1}
            className={cn(
              "mt-2 touch-none",
              !vatConfig.isEditable && "opacity-50",
            )}
          />
          <div className="mt-1 flex justify-between text-sm text-muted-foreground">
            <span>0%</span>
            <span
              className={cn(
                "font-medium",
                !vatConfig.isEditable
                  ? "text-muted-foreground"
                  : "text-foreground",
              )}
            >
              {vatConfig.rate.toFixed(1)}%
            </span>
            <span>25%</span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {STAGES.map((stage, index) => (
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: index <= currentStage ? 1 : 0,
              y: index <= currentStage ? 0 : 50,
            }}
            transition={{ duration: 0.5 }}
          >
            <Stage
              name={stage}
              icon={stageIcons[index]}
              margin={margins[index]}
              vat={vatConfig.rate}
              price={prices[index].price}
              vatAmount={prices[index].vatAmount}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
