"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/vat-utils";
import { StageConfig } from "@/types/vat";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function Stage({
  name,
  icon,
  margin,
  vat,
  price,
  inputVAT,
  outputVAT,
  netVAT,
}: StageConfig) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="rounded-lg border bg-white p-4 shadow-md transition-all duration-200 hover:shadow-lg"
    >
      <CollapsibleTrigger className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="font-bold">{name}</h3>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4 space-y-2">
        <p className="text-sm text-muted-foreground">
          Harga:{" "}
          <span className="font-medium text-foreground">
            {formatCurrency(price)}
          </span>
        </p>
        <p className="text-sm text-muted-foreground">
          Margin: <span className="font-medium text-foreground">{margin}%</span>
        </p>
        {name !== "Konsumen" && (
          <p className="text-sm text-muted-foreground">
            PPN: <span className="font-medium text-foreground">{vat}%</span>
          </p>
        )}
        {(name === "Distributor" || name === "Toko") && (
          <>
            <p className="text-sm text-muted-foreground">
              PPN Masukan:{" "}
              <span className="font-medium text-foreground">
                Rp {Math.round(inputVAT).toLocaleString("id-ID")}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              PPN Keluaran:{" "}
              <span className="font-medium text-foreground">
                Rp {Math.round(outputVAT).toLocaleString("id-ID")}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              PPN Terutang:{" "}
              <span
                className={cn(
                  "font-medium",
                  netVAT > 0 ? "text-red-600" : "text-green-600",
                )}
              >
                Rp {Math.round(netVAT).toLocaleString("id-ID")}
              </span>
            </p>
          </>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
