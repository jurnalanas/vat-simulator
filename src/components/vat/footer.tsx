import Link from "next/link";

export function Footer() {
  return (
    <div className="mt-8 rounded-sm border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-4 text-center text-slate-900 lg:mt-12">
      <p className="text-center">
        Mau belajar programming dan mulai coding career? Cek panduannya{" "}
        <Link
          href="https://panduancod.ing/#waitlist"
          className="text-blue-800"
          target="_blank"
        >
          di sini
        </Link>
        <span className="ml-2 text-sm">🚀</span>
      </p>
    </div>
  );
}
