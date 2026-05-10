"use client";

import jsPDF from "jspdf";

import { useAuditStore } from "@/lib/store";

export default function DownloadReport() {

  const result = useAuditStore(
    (state) => state.result
  );

  if (!result) {
    return null;
  }

  const handleDownload = () => {

    const doc = new jsPDF();

    doc.setFontSize(22);

    doc.text(
      "SpendScope AI Audit Report",
      20,
      25
    );

    doc.setFontSize(14);

    doc.text(
      `Current Spend: $${result.currentSpend}`,
      20,
      50
    );

    doc.text(
      `Optimized Spend: $${result.optimizedSpend}`,
      20,
      65
    );

    doc.text(
      `Yearly Savings: $${result.yearlySavings}`,
      20,
      80
    );

    doc.text(
      "Recommendations:",
      20,
      105
    );

    result.recommendations.forEach(
      (recommendation, index) => {

        doc.text(
          `• ${recommendation}`,
          25,
          120 + index * 15
        );
      }
    );

    doc.save(
      "spendscope-audit-report.pdf"
    );
  };

  return (

    <section className="mx-auto mt-8 w-full max-w-5xl px-4 sm:px-6">

      <button
        onClick={handleDownload}
        className="w-full rounded-2xl bg-green-500 py-4 font-semibold text-black transition hover:scale-[1.01] hover:bg-green-400"
      >
        Download Audit Report
      </button>

    </section>
  );
}