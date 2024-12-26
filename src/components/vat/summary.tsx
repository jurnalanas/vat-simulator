import Link from "next/link";
import { formatCurrency } from "@/lib/vat-utils";
import { StageData } from "@/types/vat";

interface SummaryProps {
  vatRates: number[];
  prices1: StageData[];
  prices2: StageData[];
}

export function Summary({ vatRates, prices1, prices2 }: SummaryProps) {
  return (
    <div className="mt-8 space-y-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-slate-900 md:text-3xl">
        Kesimpulan
      </h3>
      <div className="space-y-4">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="text-lg leading-relaxed text-slate-800 md:text-xl">
            Dengan PPN{" "}
            <span className="font-semibold text-green-600">{vatRates[1]}%</span>
            , konsumen membayar{" "}
            <span className="font-bold text-red-600">
              {formatCurrency(
                Math.round(prices2[3].price) - Math.round(prices1[3].price),
              )}
            </span>{" "}
            lebih mahal untuk produk yang sama dibandingkan dengan PPN{" "}
            <span className="font-semibold text-blue-600">{vatRates[0]}%</span>.
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="text-lg leading-relaxed text-slate-800 md:text-xl">
            Total PPN yang terkumpul:{" "}
            <span className="block space-x-2 pt-2 text-center">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1">
                {formatCurrency(Math.round(prices1[3].totalVAT))} ({vatRates[0]}
                %)
              </span>
              <span className="font-bold">vs</span>
              <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-1">
                {formatCurrency(Math.round(prices2[3].totalVAT))} ({vatRates[1]}
                %)
              </span>
            </span>
          </p>
        </div>
      </div>
      <div className="text-xs text-muted-foreground">
        <p>
          This is just a simple simulation. If you have any suggestions, please{" "}
          <Link
            href="https://x.com/oianas_/status/1871874431846650045"
            className="text-muted-foreground underline"
          >
            report it here.
          </Link>
        </p>
      </div>
    </div>
  );
}
