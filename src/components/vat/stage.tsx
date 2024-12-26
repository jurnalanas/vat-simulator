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
  vatAmount,
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
        <p className="text-sm text-muted-foreground">
          PPN: <span className="font-medium text-foreground">{vat}%</span>
        </p>
        <p className="text-sm text-muted-foreground">
          PPN Amount:{" "}
          <span className="font-medium text-foreground">
            {formatCurrency(vatAmount)}
          </span>
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
}
