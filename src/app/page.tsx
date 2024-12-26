import VATComparison from "@/components/vat-comparison";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perbandingan PPN interaktif",
  description: "Perbandingan PPN dan pengaruhnya pada konsumen",
  keywords: ["PPN", "Perbandingan", "Konsumen", "Pajak"],
  openGraph: {
    title: "Perbandingan PPN interaktif",
    description: "Perbandingan PPN dan pengaruhnya pada konsumen",
    images: [
      {
        url: "/social/og-ppn.png",
        width: 840,
        height: 441,
      },
    ],
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-slate-900 p-4 lg:p-24 font-sans">
      <VATComparison />
    </main>
  );
}
