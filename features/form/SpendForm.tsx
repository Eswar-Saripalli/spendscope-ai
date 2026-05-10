"use client";

import { useState } from "react";

import { generateAudit } from "@/utils/auditEngine";
import { useAuditStore } from "@/lib/store";

const tools = [
  "ChatGPT",
  "Claude",
  "Cursor",
  "GitHub Copilot",
  "Gemini",
];

interface ToolEntry {
  tool: string;
  monthlySpend: string;
}

export default function SpendForm() {

  const [toolEntries, setToolEntries] =
    useState<ToolEntry[]>([
      {
        tool: "ChatGPT",
        monthlySpend: "",
      },
    ]);

  const [teamSize, setTeamSize] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const setResult = useAuditStore(
    (state) => state.setResult
  );

  const handleToolChange = (
    index: number,
    field: keyof ToolEntry,
    value: string
  ) => {

    const updatedEntries = [...toolEntries];

    updatedEntries[index][field] = value;

    setToolEntries(updatedEntries);
  };

  const addTool = () => {

    setToolEntries([
      ...toolEntries,
      {
        tool: "ChatGPT",
        monthlySpend: "",
      },
    ]);
  };

  const removeTool = (
    index: number
  ) => {

    const updatedEntries =
      toolEntries.filter(
        (_, i) => i !== index
      );

    setToolEntries(updatedEntries);
  };

  const handleGenerateAudit = async () => {

    setError("");

    if (!teamSize || Number(teamSize) <= 0) {

      setError(
        "Please enter a valid team size."
      );

      return;
    }

    for (const entry of toolEntries) {

      if (
        !entry.monthlySpend ||
        Number(entry.monthlySpend) <= 0
      ) {

        setError(
          "Please enter valid monthly spend values for all tools."
        );

        return;
      }
    }

    setLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 1200)
    );

    let totalCurrentSpend = 0;

    let totalOptimizedSpend = 0;

    let allRecommendations: string[] = [];

    toolEntries.forEach((entry) => {

      const result = generateAudit({
        tool: entry.tool,
        monthlySpend: Number(
          entry.monthlySpend
        ),
        teamSize: Number(teamSize),
      });

      totalCurrentSpend +=
        result.currentSpend;

      totalOptimizedSpend +=
        result.optimizedSpend;

      allRecommendations = [
        ...allRecommendations,
        ...result.recommendations,
      ];
    });

    setResult({
      currentSpend: totalCurrentSpend,
      optimizedSpend: totalOptimizedSpend,
      yearlySavings:
        (totalCurrentSpend -
          totalOptimizedSpend) *
        12,
      recommendations:
        allRecommendations,
    });

    setLoading(false);
  };

  return (
    <section className="mx-auto mt-20 w-full max-w-3xl px-4 sm:px-6">

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-8">

        <h2 className="text-2xl font-bold sm:text-3xl">
          Start Your AI Spend Audit
        </h2>

        <p className="mt-2 text-sm text-gray-400 sm:text-base">
          Enter your current AI stack details to identify savings opportunities.
        </p>

        <div className="mt-8 space-y-8">

          {error && (

            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">

              {error}

            </div>

          )}

          {toolEntries.map(
            (entry, index) => (

              <div
                key={index}
                className="space-y-4 rounded-2xl border border-white/10 p-4"
              >

                <div className="flex items-center justify-between">

                  <h3 className="text-sm font-semibold text-gray-300">
                    Tool #{index + 1}
                  </h3>

                  {toolEntries.length > 1 && (

                    <button
                      type="button"
                      onClick={() =>
                        removeTool(index)
                      }
                      className="cursor-pointer rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs text-red-400 transition hover:bg-red-500/20 sm:text-sm"
                    >
                      Remove
                    </button>

                  )}

                </div>

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    AI Tool
                  </label>

                  <select
                    value={entry.tool}
                    onChange={(e) =>
                      handleToolChange(
                        index,
                        "tool",
                        e.target.value
                      )
                    }
                    className="w-full cursor-pointer rounded-xl border border-white/10 bg-black p-3 text-sm text-white outline-none transition hover:border-white/30 sm:p-4 sm:text-base"
                  >
                    {tools.map((tool) => (

                      <option
                        key={tool}
                        value={tool}
                      >
                        {tool}
                      </option>

                    ))}
                  </select>

                </div>

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Monthly Spend ($)
                  </label>

                  <input
                    type="number"
                    placeholder="200"
                    value={entry.monthlySpend}
                    onChange={(e) =>
                      handleToolChange(
                        index,
                        "monthlySpend",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-white/10 bg-black p-3 text-sm text-white outline-none transition focus:border-white/40 sm:p-4 sm:text-base"
                  />

                </div>

              </div>
            )
          )}

          <div>

            <label className="mb-2 block text-sm font-medium">
              Team Size
            </label>

            <input
              type="number"
              placeholder="5"
              value={teamSize}
              onChange={(e) =>
                setTeamSize(e.target.value)
              }
              className="w-full rounded-xl border border-white/10 bg-black p-3 text-sm text-white outline-none transition focus:border-white/40 sm:p-4 sm:text-base"
            />

          </div>

          <button
            type="button"
            onClick={addTool}
            className="w-full cursor-pointer rounded-2xl border border-white/10 bg-black/30 py-3 text-sm font-semibold text-white transition duration-300 hover:border-white/20 hover:bg-white/5 sm:py-4 sm:text-base"
          >
            + Add Another Tool
          </button>

          <button
            onClick={handleGenerateAudit}
            disabled={loading}
            className="w-full cursor-pointer rounded-2xl bg-white py-3 text-sm font-semibold text-black transition duration-300 hover:scale-[1.01] hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60 sm:py-4 sm:text-base"
          >
            {loading
              ? "Analyzing Spend..."
              : "Generate Audit"}
          </button>

        </div>

      </div>

    </section>
  );
}