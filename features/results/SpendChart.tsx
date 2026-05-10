"use client";

import { useAuditStore } from "@/lib/store";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function SpendChart() {

  const result = useAuditStore(
    (state) => state.result
  );

  if (!result) {
    return null;
  }

  const data = [
    {
      name: "Current",
      amount: result.currentSpend,
    },
    {
      name: "Optimized",
      amount: result.optimizedSpend,
    },
  ];

  return (

    <section className="mx-auto mt-8 w-full max-w-5xl px-4 sm:px-6">

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-8">

        <h3 className="text-xl font-bold sm:text-2xl">
          Spend Comparison
        </h3>

        <p className="mt-2 text-sm text-gray-400 sm:text-base">
          Compare your current AI spending with optimized recommendations.
        </p>

        <div className="mt-8 h-[320px] w-full">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart data={data}>

              <XAxis
                dataKey="name"
                stroke="#9ca3af"
              />

              <YAxis
                stroke="#9ca3af"
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#111111",
                  border: "1px solid #222",
                  borderRadius: "12px",
                  color: "#ffffff",
                }}
              />

              <Bar
                dataKey="amount"
                fill="#00ff99"
                radius={[12, 12, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </section>
  );
}