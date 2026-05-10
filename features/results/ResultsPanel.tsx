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
    <section className="mx-auto mt-16 w-full max-w-5xl px-4 sm:px-6">

      {/* Top Stats */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

        {/* Current Spend */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20 sm:p-6">

          <div className="flex items-center justify-between">

            <p className="text-sm text-gray-400">
              Current Spend
            </p>

            <TrendingDown
              className="text-red-400"
              size={20}
            />

          </div>

          <h3 className="mt-4 text-3xl font-bold sm:text-4xl">
            ${result.currentSpend}
          </h3>

        </div>

        {/* Optimized Spend */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20 sm:p-6">

          <div className="flex items-center justify-between">

            <p className="text-sm text-gray-400">
              Optimized Spend
            </p>

            <Sparkles
              className="text-green-400"
              size={20}
            />

          </div>

          <h3 className="mt-4 text-3xl font-bold text-green-400 sm:text-4xl">
            ${result.optimizedSpend}
          </h3>

        </div>

        {/* Savings */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20 sm:p-6">

          <div className="flex items-center justify-between">

            <p className="text-sm text-gray-400">
              Yearly Savings
            </p>

            <BadgeDollarSign
              className="text-green-500"
              size={20}
            />

          </div>

          <h3 className="mt-4 text-3xl font-bold text-green-500 sm:text-4xl">
            ${result.yearlySavings}
          </h3>

        </div>

      </div>

      {/* Recommendations */}

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-8">

        <div className="flex items-center gap-3">

          <Sparkles
            className="text-green-400"
            size={24}
          />

          <h3 className="text-xl font-bold sm:text-2xl">
            Smart Recommendations
          </h3>

        </div>

        {result.recommendations.length > 0 ? (

          <div className="mt-6 space-y-4">

            {result.recommendations.map(
              (recommendation, index) => (

                <div
                  key={index}
                  className="flex items-start gap-4 rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-300 transition duration-300 hover:scale-[1.01] sm:p-5 sm:text-base"
                >

                  <div className="mt-1">

                    <Sparkles
                      size={18}
                    />

                  </div>

                  <p className="leading-relaxed break-words">
                    {recommendation}
                  </p>

                </div>
              )
            )}

          </div>

        ) : (

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-gray-400 sm:p-5 sm:text-base">

            No optimization opportunities detected.

          </div>

        )}

      </div>

    </section>
  );
}