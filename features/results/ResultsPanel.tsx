"use client";

import { useAuditStore } from "@/lib/store";
import {
  TrendingDown,
  BadgeDollarSign,
  Sparkles,
} from "lucide-react";

export default function ResultsPanel() {

  const result = useAuditStore(
    (state) => state.result
  );

  if (!result) {
    return null;
  }

  return (
    <section className="mx-auto mt-16 max-w-5xl">

      {/* Top Stats */}

      <div className="grid gap-6 md:grid-cols-3">

        {/* Current Spend */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20">

          <div className="flex items-center justify-between">

            <p className="text-sm text-gray-400">
              Current Spend
            </p>

            <TrendingDown
              className="text-red-400"
              size={20}
            />

          </div>

          <h3 className="mt-4 text-4xl font-bold">
            ${result.currentSpend}
          </h3>

        </div>

        {/* Optimized Spend */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20">

          <div className="flex items-center justify-between">

            <p className="text-sm text-gray-400">
              Optimized Spend
            </p>

            <Sparkles
              className="text-green-400"
              size={20}
            />

          </div>

          <h3 className="mt-4 text-4xl font-bold text-green-400">
            ${result.optimizedSpend}
          </h3>

        </div>

        {/* Savings */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20">

          <div className="flex items-center justify-between">

            <p className="text-sm text-gray-400">
              Yearly Savings
            </p>

            <BadgeDollarSign
              className="text-green-500"
              size={20}
            />

          </div>

          <h3 className="mt-4 text-4xl font-bold text-green-500">
            ${result.yearlySavings}
          </h3>

        </div>

      </div>

      {/* Recommendations */}

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">

        <div className="flex items-center gap-3">

          <Sparkles
            className="text-green-400"
            size={24}
          />

          <h3 className="text-2xl font-bold">
            Smart Recommendations
          </h3>

        </div>

        {result.recommendations.length > 0 ? (

          <div className="mt-6 space-y-4">

            {result.recommendations.map(
              (recommendation, index) => (

                <div
                  key={index}
                  className="flex items-start gap-4 rounded-2xl border border-green-500/20 bg-green-500/10 p-5 text-green-300 transition duration-300 hover:scale-[1.01]"
                >

                  <div className="mt-1">

                    <Sparkles
                      size={18}
                    />

                  </div>

                  <p className="leading-relaxed">
                    {recommendation}
                  </p>

                </div>
              )
            )}

          </div>

        ) : (

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5 text-gray-400">

            No optimization opportunities detected.

          </div>

        )}

      </div>

    </section>
  );
}