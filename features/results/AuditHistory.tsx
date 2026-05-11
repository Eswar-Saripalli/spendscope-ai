"use client";

import { useEffect } from "react";

import { useAuditStore } from "@/lib/store";

export default function AuditHistory() {

  const history = useAuditStore(
    (state) => state.history
  );

  const clearHistory = useAuditStore(
    (state) => state.clearHistory
  );

  useEffect(() => {

    const savedHistory = JSON.parse(
      localStorage.getItem("audit-history") || "[]"
    );

    useAuditStore.setState({
      history: savedHistory,
    });

  }, []);

  if (history.length === 0) {
    return null;
  }

  return (

    <section className="mx-auto mt-8 w-full max-w-5xl px-4 sm:px-6">

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">

        <div className="mb-6 flex items-center justify-between">

          <h3 className="text-2xl font-bold">
            Audit History
          </h3>

          <button
            onClick={clearHistory}
            className="rounded-xl border border-red-500/40 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
          >
            Clear History
          </button>

        </div>

        <div className="space-y-4">

          {history.map((audit, index) => (

            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-black/40 p-5"
            >

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="text-sm text-gray-400">
                    {audit.createdAt || "Recent Audit"}
                  </p>

                  <h4 className="mt-1 text-xl font-semibold">
                    ${audit.currentSpend} → ${audit.optimizedSpend}
                  </h4>

                </div>

                <div className="text-green-400 font-medium">

                  Saved ${audit.yearlySavings}/year

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}